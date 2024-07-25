import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textPipe',
  pure: true,
  standalone: true,
})
export class TextPipe implements PipeTransform {
  transform(value: any, index: number): any {
    if (index !== undefined) {
      return `${value} - ${index}`;
    }
    return value;
  }
}
