import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

type PersonType = typeof PersonUtils;

@Pipe({
  name: 'util',
  standalone: true,
})
export class UtilPipe implements PipeTransform {
  transform<T extends keyof PersonType>(
    utilityName: T,
    ...args: Parameters<PersonType[T]>
  ): ReturnType<PersonType[T]> {
    const fn = PersonUtils[utilityName];
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (fn as Function)(...args);
  }
}
