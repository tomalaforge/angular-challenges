import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavComputation',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}
