export type EnumsConfigKeys = {
  key?: string;
  value?: string;
};

export type EnumsConfig = {
  keys?: EnumsConfigKeys;
};

export type EnumSource = {
  key?: string;
  value?: string | number;
  [k: string]: any;
};

export type RebuildCallback = (source: EnumSource, index: number) => EnumSource;

export type FilterRowCallback = (
  value: any,
  row: { index: number; item: EnumSource }
) => boolean;
