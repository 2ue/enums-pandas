import { isNull } from './utils';
type EnumsConfigKeys = {
  key?: string;
  value?: string;
};

type EnumsConfig = {
  keys?: EnumsConfigKeys;
  // 使用缓存，提高性能，使用后，查询操作会进行缓存，除非进行了枚举的修改（增删改等操作）
  useCache?: boolean;
};


type EnumSource = {
  key?: string
  value?: string | number
  [k: string]: any
};

type RebuildCallback = (source: EnumSource, index: number) => EnumSource;

type FilterRowCallback = (value: any, row: { index: number, item: EnumSource }) => boolean;

function transformBdict(source: EnumSource[], config?: EnumsConfig) {
  const bidict = new Map();
  const { key, value } = config?.keys || { key: 'key', value: 'value' };
  source.forEach((item) => {
    // @ts-ignore
    if (isNull(key) || !Object.prototype.hasOwnProperty.call(item, key)) {
      throw new Error(`Enums: when transformBdict key ${key} is not exist`);
    }
    // @ts-ignore
    if (isNull(value)  || !Object.prototype.hasOwnProperty.call(item, value)) {
      throw new Error(`Enums: when transformBdict value ${value} is not exist`);
    }
    // @ts-ignore
    const k = item[key];
    // @ts-ignore
    const v = item[value];
    if (bidict.has(k)) {
      console.warn(`Enums: when transformBdict has Duplicate ${key}: ${k}`);
    }
    if (bidict.has(v)) {
      console.warn(`Enums: when transformBdict has Duplicate ${value}: ${v}`);
    }
    bidict.set(k, v);
    bidict.set(v, k);
  });
  return bidict;
}

export class Enums {
  #_size: number | null = null;
  #_source: EnumSource[] = [];
  // value和key的双向映射，要求value和key的值不能重复
  #_bdict: Map<string, string | number> = new Map();
  #_config: EnumsConfig = {};
  // 在某些场景下，源枚举数据会不满足要求，此时可以通过rebuild方法，对枚举数据重新构建，生成一个新的枚举，并缓存其结果
  #rebuildCache: Record<string, EnumSource[]> = {};
  constructor(source: EnumSource[], config?: EnumsConfig) {
    this.#_source = source;
    this.#_config = config || {};
    this.init();
  }
  init(config?: EnumsConfig) {
    console.log('config', config);
  }
  // 提供给外部访问的源数据，不允许修改
  get source() {
    return this.#_source;
  }
  get size() {
    if (this.#_size === null) {
      this.#_size = this.#_source.length;
    }
    return this.#_size;
  }
  /**
   * 一个由{key}和{value}构成的双向映射表，方便使用
   * */
  get bidict() {
    if (this.#_bdict.size === 0) {
      this.#_bdict = transformBdict(this.source, this.#_config);
    }
    // @ts-ignore
    return Object.fromEntries(this.#_bdict);
  }
  get rebuildCache() {
    return this.#rebuildCache;
  }
  rebuild(cb: RebuildCallback, key?: string) {
    const newEnums = this.#_source.map(cb);
    if (key) {
      this.#rebuildCache[key] = newEnums;
    }
    return newEnums;
  }
  getRow(columnKey: string, value: number | string) {
    return this.#_source.find(item => item[columnKey] === value);
  }
  getRowsBy(columnKey: string, callback: FilterRowCallback) {
    return this.#_source.filter((item, index) => callback(item[columnKey], { index, item }));
  }
  getColumns(columnKey: string) {
    return this.#_source.map(item => item[columnKey]);
  }
  getColumnsBy(columnKey: string, callback: FilterRowCallback) {
    const newRows = this.getRowsBy(columnKey, callback);
    return newRows.map(item => item[columnKey]);
  }
}
