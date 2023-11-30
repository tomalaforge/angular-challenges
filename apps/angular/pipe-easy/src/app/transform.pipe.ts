import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform',
  standalone: true,
})
export class TransformPipe implements PipeTransform {
  transform(name: string, index?: number): string {
    // very heavy computation
    return `${name} - ${index}`;
  }
}
