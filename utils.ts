export const isNull = (value: any) => [undefined, '', null, NaN].includes(value);
// 拓展isNull方法，判断array和json是否为空
export const isBlank = (value: any) => {
  if (isNull(value)) return true;
  if (Array.isArray(value)) return value.length === 0;
  return typeof value === 'object' && Object.keys(value).length === 0;
};