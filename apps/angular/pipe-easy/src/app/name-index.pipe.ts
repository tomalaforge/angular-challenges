import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameIndex',
  standalone: true,
})
export class NameIndexPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
