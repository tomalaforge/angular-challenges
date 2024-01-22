import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'HeavyComputation',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
