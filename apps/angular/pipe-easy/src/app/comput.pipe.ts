import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'comput',
})
export class ComputPipe implements PipeTransform {
  transform(name: string, index: number) {
    return `${name} - ${index}`;
  }
}
