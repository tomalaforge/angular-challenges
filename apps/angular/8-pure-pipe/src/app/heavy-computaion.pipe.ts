import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyComputation',
  standalone: true,
})
export class HeavyComputation implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}
