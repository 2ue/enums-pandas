# enmus-pandas

实现一个枚举工具，入参为两个，第一个数组枚举enums: T extends object，假设如下：
type Enum: T extends object = {
  value?: string
  label?: string
  key?: string
}
const enums = [
  { value: '1', label: '完善方案', key: 'PERFECT_SCHEME', },
  { value: '9', label: '原厂技术授权', key: 'ASP_AUTHORIZATION_OLD' }
]
其中value和key每个属性的值是唯一，不重复

第二个参数是可选参数options?: Partial<EnumsOptions>：
type EnumsOptions {
  // 定义枚举中value和key的映射属性名
  keys: Record<string, string>;
}


经过工具包装后，返回一个enums对象，其具有以下特点：
enums.source可以得到原始数据nodes
enums.rebuild可以重新构建数据
enums.size可以得到数据的长度
enums.bdict返回key和value的双向映射字典
enums.hasKey(key: string | string[])可以判断是否存在该key
enums.hasValue(value: any | any[])可以判断是否存在该value
enums.keys()可以得到所有key的数组
enums.key(key: string)可以得到该key对应行数据
enums.values()可以得到所有value的数组
enums.value(value: any[])可以得到该value对应行数据
enums.columns(field: string)根据属性得到该属性所在列的所有值
enums.rows(field: string)根据行属性得到该属性所在行的所有值
enums.find(field: string, value: any)返回对应field和value的行数据
enums.findBy((enum) => boolean)可以得到符合条件的数据数组
enums.entries()可以得到所有key-value的数组
enums.entriesFrom()可以得到所有value-key的数组
enums.getValue(key)可以得到指定key的value
enums.getKey(value)可以得到指定value的key
enums.checkUnique(keys: string | string[], crossCheck: boolean)检查指定属性的唯一性
enums.append(enums: Enum[] | Enum)添加一行数据
enums.insert(value: string, enums: Enum[] | Enum)找到key对应值所在的行，再其后插入一行或多行数据
enums.insertByIndex(index: number, enums: Enum[] | Enum)根据index插入一行数据
enums.removeByIndex(key: string)根据index删除一行数据
enums.remove(key: string)根据key的value删除一行数据
enums.update(key: string, enum: Enum)更新一行数据
