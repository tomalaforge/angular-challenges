import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heavyTransformation',
  standalone: true,
})
export class HeavyTransformationPipe implements PipeTransform {
  transform(value: string, index: number): any {
    return `${value} - ${index}`;
  }
}
