import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personDisplay',
  standalone: true,
})
export class PersonDisplayPipe implements PipeTransform {
  transform(name: string, index: number): string {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
