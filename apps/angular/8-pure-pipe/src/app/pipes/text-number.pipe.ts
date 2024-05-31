import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textNumber',
  standalone: true,
})
export class TextNumberPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}
