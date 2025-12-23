import { Pipe, PipeTransform } from '@angular/core';
import {
  PersonUtilParams,
  PersonUtilReturnType,
  PersonUtils,
  PersonUtilsFnKey,
} from './person.utils';

@Pipe({
  name: 'wrappFn',
})
export class WrapperUtilsPipe implements PipeTransform {
  transform<T extends PersonUtilsFnKey>(
    fn: T,
    ...args: PersonUtilParams<T>
  ): PersonUtilReturnType<T> {
    return (PersonUtils[fn] as Function)(...args);
  }
}
