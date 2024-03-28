Enums 类是一个用于处理枚举的工具类。下面是对该类中各个方法的说明和示例：
const source = [
  { key: 'test1', value: 'value1' },
  { key: 'test2', value: 'value2' },
];
const enums = new Enums(source);


init(config?: EnumsConfig): 初始化方法，用于设置枚举的配置对象。可以传入一个可选的 config 参数来覆盖默认配置。示例：

enums.init({ useCache: true });


source: 获取枚举项数组。示例：

console.log(enums.source); // 输出: [{ key: 'test1', value: 'value1' }, { key: 'test2', value: 'value2' }]


size: 获取枚举项数量。示例：

console.log(enums.size); // 输出: 2


bdict: 获取枚举项的键值对。示例：

console.log(enums.bdict);
// 输出:
// {
//   test1: 'value1',
//   value1: 'test1',
//   test2: 'value2',
//   value2: 'test2'
// }


rebuild(cb: RebuildCallback, key?: string): 根据回调函数重建枚举项数组，并可选择将重建结果存入重建缓存对象中。示例：

const newEnums = enums.rebuild((item) => {
  return { ...item, value: item.value.toUpperCase() };
}, 'uppercase');
console.log(newEnums);
// 输出:
// [
//   { key: 'test1', value: 'VALUE1' },
//   { key: 'test2', value: 'VALUE2' }
// ]
console.log(enums.rebuildCache.uppercase);
// 输出:
// [
//   { key: 'test1', value: 'VALUE1' },
//   { key: 'test2', value: 'VALUE2' }
// ]


getRow(columnKey: string, value: number | string): 根据指定的列键和值获取对应的行。示例：

console.log(enums.getRow('key', 'test1')); // 输出: { key: 'test1', value: 'value1' }


getRowsBy(columnKey: string, callback: FilterRowCallback): 根据指定的列键和回调函数筛选出符合条件的行数组。示例：

const filteredRows = enums.getRowsBy('value', (value) => value.includes('value'));
console.log(filteredRows);
// 输出:
// [
//   { key: 'test1', value: 'value1' },
//   { key: 'test2', value: 'value2' }
// ]


getColumns(columnKey: string): 获取指定列键的所有值组成的数组。示例：

console.log(enums.getColumns('key')); // 输出: ['test1', 'test2']


getColumnsBy(columnKey: string, callback: FilterRowCallback): 根据指定的列键和回调函数筛选出符合条件的值组成的数组。示例：

const filteredColumns = enums.getColumnsBy('value', (value) => value.includes('value'));
console.log(filteredColumns); // 输出: ['value1', 'value2']

通过使用 Enums 类及其方法，你可以方便地处理枚举数据，并进行各种操作，如获取、筛选、重建等。
