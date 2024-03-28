type EnumsConfigKeys = {
  key?: string;
  value?: string;
};

type EnumsConfig = {
  keys: EnumsConfigKeys;
  // 使用缓存，提高性能，使用后，查询操作会进行缓存，除非进行了枚举的修改（增删改等操作）
  useCache?: boolean;
};

type Enum = {
  key: string;
  value: string;
};

type EnumSource = {
  [key: string]: any;
};

export class Enums {
  private static _size: number | null = null;
  private static _source: EnumSource[] = [];
  // value和key的双向映射，这要求value和key的值不能重复
  static readonly bdict: Map<string, string | number> = new Map();
  // 提供给外部访问的源数据，不允许修改，是一份拷贝
  static get source() {
    return this._source;
  }
  static get soure() {
    if (this._size === null) {
      this._size = Object.keys(this._enums).length;
    }
    return this._size;
  }
  // 转换后的数据, 要求key的值不能重复
  private static _enums: Map<string, Enum[]> = new Map();
  private config: EnumsConfig;
  constructor(source: EnumSource[], config: EnumsConfig) {
    this.config = config;
    Enums._source = source;
  }
  getSize() {
    return Enums.source.length
  }
}
