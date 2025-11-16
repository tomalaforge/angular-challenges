const showName = (name: string, index: number) => {
  // very heavy computation
  return `${name} - ${index}`;
};

const isAllowed = (age: number, isFirst: boolean, activityAge: number) => {
  if (isFirst) {
    return 'always allowed';
  } else {
    return age > activityAge ? 'allowed' : 'declined';
  }
};

export const PersonUtils = {
  showName,
  isAllowed,
};

export type PersonUtils = typeof PersonUtils;

export type PersonUtilsFnKey = {
  [K in keyof PersonUtils]: PersonUtils[K] extends (...args: any[]) => any
    ? K
    : never;
}[keyof PersonUtils];

export type PersonUtilParams<K extends PersonUtilsFnKey> =
  PersonUtils[K] extends (...args: infer A) => any ? A : never;
export type PersonUtilReturnType<K extends PersonUtilsFnKey> =
  PersonUtils[K] extends (...args: any[]) => infer R ? R : never;
