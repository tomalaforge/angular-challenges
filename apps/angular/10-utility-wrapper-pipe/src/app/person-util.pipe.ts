import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

type PersonType = typeof PersonUtils;

@Pipe({
  name: 'personUtil',
  standalone: true,
})
export class PersonUtilPipe implements PipeTransform {
  transform<T extends keyof PersonType>(
    functionName: T,
    ...args: Parameters<PersonType[T]>
  ): ReturnType<PersonType[T]> {
    const fn = PersonUtils[functionName];
    // I dislike `as Function` but it's the only way I know to make this work
    // eslint-disable-next-line @typescript-eslint/ban-types
    return (fn as Function)(...args);
  }
}
