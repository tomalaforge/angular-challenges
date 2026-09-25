// heavy-computation.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number): string {
    console.log('触发了复杂计算:', name);
    return `${name} - ${index}`;
  }
}
