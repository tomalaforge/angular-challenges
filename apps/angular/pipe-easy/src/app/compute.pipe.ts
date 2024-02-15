import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'compute',
  standalone: true,
})
export class ComputePipe implements PipeTransform {
  transform(name: string, index: number): string {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
