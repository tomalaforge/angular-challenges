import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'computation',
  standalone: true,
})
export class ComputationPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
