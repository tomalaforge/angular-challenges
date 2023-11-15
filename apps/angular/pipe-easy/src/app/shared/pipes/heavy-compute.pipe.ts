import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyCompute',
  standalone: true,
})
export class HeavyComputePipe implements PipeTransform {
  transform(name: string, index: number): unknown {
    return `${name} - ${index}`;
  }
}
