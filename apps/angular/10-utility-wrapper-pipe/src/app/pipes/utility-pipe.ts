import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from '../date.util';
import { PersonUtils } from '../person.utils';
import { MethodKey, MethodMap, UtilFnNames } from './UtilFnNames';

@Pipe({
  name: 'utility',
})
export class UtilityPipe implements PipeTransform {
  transform<T extends MethodKey, F extends MethodMap[T]>(
    fnName: T,
    ...args: Parameters<F>
  ): ReturnType<F> | undefined {
    const util_type = fnName.split('.')[0] as keyof UtilFnNames;

    if (util_type === 'PersonUtils') {
      const method_name = fnName.split('.')[1] as UtilFnNames['PersonUtils'];
      return (PersonUtils[method_name] as (...args: any) => any)(...args);
    }
    if (util_type === 'DateUtils') {
      const method_name = fnName.split('.')[1] as UtilFnNames['DateUtils'];
      return (DateUtils[method_name] as (...args: any) => any)(...args);
    }
  }
}
