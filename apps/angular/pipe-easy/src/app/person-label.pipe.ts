import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'personLabel',
})
export class PersonLabelPipe implements PipeTransform {
  transform(name: string, index = 0): string {
    return `${name} - ${index}`;
  }
}
