import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameIndex',
  standalone: true,
})
export class NameIndexPipe implements PipeTransform {
  transform(value: string, index: number) {
    return `${value} - ${index}`;
  }
}
