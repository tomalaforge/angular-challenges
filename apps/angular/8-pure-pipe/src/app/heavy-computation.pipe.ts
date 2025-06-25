import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
