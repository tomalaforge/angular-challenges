import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'memoize',
  standalone: true,
})
export class MemoizePipe implements PipeTransform {
  transform(num: number): number {
    if (num === 1 || num === 2) {
      return 1;
    }
    return this.transform(num - 1) + this.transform(num - 2);
  }
}
