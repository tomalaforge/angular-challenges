import { Pipe, PipeTransform } from '@angular/core';

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

export type PersonUtilFunctionName = keyof typeof PersonUtils;

export type MappedType<T extends PersonUtilFunctionName> =
  (typeof PersonUtils)[T];

export type Params<T extends PersonUtilFunctionName> = Parameters<
  MappedType<T>
>;

export type FirstArg<T> = T extends [infer First, ...unknown[]] ? First : never;
export type LastArgs<T> = T extends [unknown, ...infer Rest] ? Rest : never;

@Pipe({
  name: 'person',
  standalone: true,
})
export class PersonUtilsPipe implements PipeTransform {
  public transform<T extends PersonUtilFunctionName>(
    value: FirstArg<Params<T>>,
    functionName: T,
    ...args: LastArgs<Params<T>>
  ): ReturnType<MappedType<T>> {
    return (PersonUtils[functionName] as Function)(value, ...args);
  }
}
