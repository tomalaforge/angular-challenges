import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personDisplay',
  standalone: true,
})
export class PersonPipe implements PipeTransform {
  transform(name: string, index: number) {
    return `${name} - ${index}`;
  }
}
