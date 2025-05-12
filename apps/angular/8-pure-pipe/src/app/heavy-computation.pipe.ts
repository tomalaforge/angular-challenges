import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
})
export class HeavyComputationPipe implements PipeTransform {
  transform(item: string, index: number): string {
    return `${item} - ${index}`;
  }
}
