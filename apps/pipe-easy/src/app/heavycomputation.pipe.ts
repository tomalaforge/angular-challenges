import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compute',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: string, args?: number): string {
    console.log('heavy computation');
    return `${value} - ${args}`;
  }
}
