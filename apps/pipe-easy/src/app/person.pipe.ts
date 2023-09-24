import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personIndex',
  standalone: true,
})
export class PersonPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
