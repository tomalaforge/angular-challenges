import { Pipe, PipeTransform } from '@angular/core';
import { Person } from './person';

@Pipe({
  name: 'custom',
  standalone: true,
})
export class CustomPipe implements PipeTransform {
  transform(
    person: Person,
    index: number,
    isFirst: boolean,
    activityAge: number,
  ): string {
    const commonElement = `${person.name} - ${index}`;
    if (isFirst) {
      return `${commonElement} always allowed`;
    } else {
      return person.age > activityAge
        ? `${commonElement} allowed`
        : `${commonElement} declined `;
    }
  }
}
