import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number): string {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
