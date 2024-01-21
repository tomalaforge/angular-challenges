import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'heavy',
  standalone: true,
})
export class HeavyComputationPipe implements PipeTransform {
  transform(value: string, param: number): string {
    return `${value} - ${param}`;
  }
}
