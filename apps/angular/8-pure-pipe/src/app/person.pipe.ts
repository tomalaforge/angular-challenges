import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './types';

@Pipe({
  name: 'person',
  standalone: true,
})
export class PersonPipe implements PipeTransform {
  transform(person: Person, index: number): string {
    return `${person || '?'} - ${index}`;
  }
}
