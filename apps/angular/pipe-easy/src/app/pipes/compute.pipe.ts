import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compute',
  standalone: true,
})
export class ComputePipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}
