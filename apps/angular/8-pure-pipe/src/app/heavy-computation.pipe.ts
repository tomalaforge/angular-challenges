import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value === 'string' && typeof args[0] === 'number') {
      const name = value;
      const index = args[0];
      // very heavy computation
      return `${name} - ${index}`;
    }
    return value;
  }
}
