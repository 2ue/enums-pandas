# EnumsPandas

> 通过使用 EnumsPandas，可以方便地处理枚举数据，并进行各种操作，如获取、筛选、重建等。

## 安装

```bash
npm install enums-pandas
```

## 使用

```js
import { EnumsPandas as EP } from 'enums-pandas';

const fruit = [
  { key: 'apple', value: 'red', label: '苹果' },
  { key: 'banana', value: 'yellow', label: '香蕉' },
];
const fruitEp = new EP(fruit);
```

另外还可以传入参数，指定对应的key和value键值，示例：

```js

const lingshi = [
  { key: 'peanut', no: 100, label: '花生' },
  { key: 'melonSeeds', no: 101, label: '瓜子' },
];
const lingshiEp = new EP(fruit, {
  keys: {
    // key: 'key', 默认为key可以不传
    value: 'no',
  }
});
```

## API

### source

> 获取源数据。
```js
console.log(fruitEp.source);
// 输出:
// [
//   { key: 'apple', value: 'red', label: '苹果' },
//   { key: 'banana', value: 'yellow', label: '香蕉' }
// ]
```

### size

> 获取枚举项数量。

```js
console.log(fruitEp.size);
// 输出: 2
```

### bidict

> 获取以{key}和{value}生成的双向映射字典（bidirectional mapping dict）

ps: 注意使用此功能，需要保证每一项{key}和{value}的值是唯一的。


```js
console.log(fruitEp.bdict);
// 输出:
// {
//   apple: 'red',
//   red: 'apple',
//   banana: 'yellow',
//   yellow: 'banana'
// }
```

### rebuild(cb: RebuildCallback, key?: string)

> 根据回调函数重建枚举项数组，并可选择(如果key有值，如果key相同则覆盖上一次的结果)，将重建结果存入重建缓存对象中。

```js
const newFruit = fruitEp.rebuild((item) => {
  return { ...item, id: item.key };
}, 'selectOptions');
console.log(newFruit);
// 输出:
// [
//   { id: 'apple', value: 'red', label: '苹果' },
//   { id: 'banana', value: 'yellow', label: '香蕉' }
// ]
console.log(fruitEp.rebuildCache.selectOptions);
// 输出:
// [
//   { id: 'apple', value: 'red', label: '苹果' },
//   { id: 'banana', value: 'yellow', label: '香蕉' }
// ]
```

## getRow(columnKey: string, value: number | string)

> 根据指定的列键和值获取对应的行。

```js
console.log(fruitEp.getRow('key', 'apple'));
// 输出:
// { key: 'apple', value: 'red', label: '苹果' }
```

### getRowsBy(columnKey: string, callback: FilterRowCallback)

> 根据指定的列键和回调函数筛选出符合条件的行数组

```js
const filteredRows = fruitEp.getRowsBy('value', (value) => value.includes('red'));
console.log(filteredRows);
// 输出:
// [
//   { key: 'apple', value: 'red', label: '苹果' }
// ]
```

### getColumns(columnKey: string)

>获取指定列键的所有值组成的数组。

```js
console.log(fruitEp.getColumns('key'));
// 输出:
// ['apple', 'banana']
```

### getColumnsBy(columnKey: string, callback: FilterRowCallback)

>根据指定的列键和回调函数筛选出符合条件的值组成的数组

```js
const filteredColumns = fruitEp.getColumnsBy('value', (value) => value.includes('red'));
console.log(filteredColumns);
// 输出:
// ['red']
```


