type EnumsConfigKeys = {
  key?: string;
  value?: string;
};

type EnumsConfig = {
  keys?: EnumsConfigKeys;
  // 使用缓存，提高性能，使用后，查询操作会进行缓存，除非进行了枚举的修改（增删改等操作）
  useCache?: boolean;
};

// type Enum = {
//   key: string;
//   value: string;
// };

type EnumSource = {
  [key: string]: any;
};

function transformBdict(source: EnumSource[], config?: EnumsConfig) {
  const bdict = new Map();
  const { key, value } = config?.keys || { key: 'key', value: 'value' };
  source.forEach((item) => {
    // @ts-ignore
    const k = item[key];
    // @ts-ignore
    const v = item[value];
    bdict.set(k, v);
    bdict.set(v, k);
  });
  return bdict;
}

export class Enums {
  #_size = 0;
  #_source: EnumSource[] = [];
  // value和key的双向映射，这要求value和key的值不能重复
  #_bdict: Map<string, string | number> = new Map();
  #_config: EnumsConfig = {};
  // 提供给外部访问的源数据，不允许修改，是一份拷贝
  get source() {
    return this.#_source;
  }
  get size() {
    if (this.#_size === 0) {
      this.#_size = this.#_source.length;
    }
    return this.#_size;
  }
  get bdict() {
    if (this.#_bdict.size === 0) {
      this.#_bdict = transformBdict(this.source, this.#_config);
    }
    return Object.fromEntries(this.#_bdict);
  }
  constructor(source: EnumSource[], config?: EnumsConfig) {
    this.#_source = source;
    this.#_config = config || {};
    this.init();
  }
  init(config?: EnumsConfig) {
    console.log('config', config);
  }
  // rebuild(key: string, cb: Function) {
  //
  // }
}

const ta = [
  { key: 'mainTask', value: 1 },
  { key: 'subTask', value: 2 },
];

const taskType = new Enums(ta);
// @ts-ignore
console.log('enums taskType', taskType._size);
console.log('enums size222', taskType.size);
console.log('enums source', taskType.source);
console.log('enums bdict', taskType.bdict);
console.log('enums bdict2', taskType.bdict['1']);
