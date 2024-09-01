import { Pipe, PipeTransform } from '@angular/core';

type FunctionMap = {
  showName: (name: string, index: number) => string;
  isAllowed: (age: number, isFirst: boolean, activityAge: number) => string;
};

@Pipe({
  name: 'wrapFn'
})
export class WrapFnPipe implements PipeTransform {
  transform<T extends keyof FunctionMap>(
    fnName: T,
    ...args: Parameters<FunctionMap[T]>
  ): ReturnType<FunctionMap[T]> {
    const fn = PersonUtils[fnName];
    if (typeof fn === 'function') {
      return fn(...args);
    }
    throw new Error(`Function ${fnName} does not exist on PersonUtils.`);
  }
}
