import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLabel',
  standalone: true,
})
export class ToLabelPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}
