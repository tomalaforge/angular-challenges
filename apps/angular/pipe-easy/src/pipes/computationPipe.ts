import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'computationPipe',
  standalone: true,
  pure: true,
})
export class ComputationPipe implements PipeTransform {
  transform(person: string, index: number): string {
    return `${person} - ${index}`;
  }
}
