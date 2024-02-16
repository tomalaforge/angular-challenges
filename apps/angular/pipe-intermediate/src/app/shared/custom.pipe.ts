import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './person';

@Pipe({
  name: 'custom',
  standalone: true,
})
export class CustomPipe implements PipeTransform {
  transform(person: Person, index: number, isFirst: boolean): string {
    const commonElement = `${person.name} - ${index}`;
    if (isFirst) {
      return `${commonElement} always allowed`;
    } else {
      return person.age > 25
        ? `${commonElement} allowed`
        : `${commonElement} declined `;
    }
  }
}
