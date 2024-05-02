import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'indexed',
})
export class IndexedPipe implements PipeTransform {
  transform(value: string, index: number): string {
    // very heavy computation
    return `${value} - ${index}`;
  }
}
