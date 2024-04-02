import { Pipe, type PipeTransform } from '@angular/core';
import { Person } from '../person.model';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class wrapFnPipe implements PipeTransform {
  transform(person: Person, index: number, isFirst: boolean): string {
    return `${person.name} - ${index} ${isFirst ? 'always allowed' : person.age > 25 ? 'allowed' : 'declined'}`;
  }
}
