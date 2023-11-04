import { Injector, Pipe, PipeTransform, inject } from '@angular/core';
import { PersonUtils } from './person.utils';

type TypeOfPerson = typeof PersonUtils;
type KeyOfPerson = keyof TypeOfPerson;
type PersonParams = TypeOfPerson[KeyOfPerson];
type Params = Parameters<PersonParams>;

@Pipe({
  standalone: true,
  name: 'utils',
  pure: true,
})
export class UtilsPipe implements PipeTransform {
  transform(utilName: KeyOfPerson, ...args: Params) {
    const util = PersonUtils[utilName];
    const typedUtil = util as (...args: Params) => ReturnType<PersonParams>;
    return typedUtil(...args);
  }
}
