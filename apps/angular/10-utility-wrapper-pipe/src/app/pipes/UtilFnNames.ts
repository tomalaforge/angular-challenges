import type { DateUtils } from '../date.util';
import type { PersonUtils } from '../person.utils';

export type UtilFnNames = {
  PersonUtils: keyof typeof PersonUtils;
  DateUtils: keyof typeof DateUtils;
};

export type MethodMap = {
  [K in keyof typeof PersonUtils as `PersonUtils.${K}`]: (typeof PersonUtils)[K];
} & {
  [D in keyof typeof DateUtils as `DateUtils.${D}`]: (typeof DateUtils)[D];
};
export type MethodKey = keyof MethodMap;
