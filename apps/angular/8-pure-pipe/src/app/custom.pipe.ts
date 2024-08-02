// custom.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
  standalone: true
})
export class CustomPipe implements PipeTransform {

  transform(value: string, index: number): string {
    if (!value) return value;
    return `${value} - ${index}`;
  }

}
