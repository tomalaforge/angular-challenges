import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'computeValues',
  pure: true,
  standalone: true,
})
export class ComputeValuesPipe implements PipeTransform {
  transform(value: string, index: number) {
    return `${value} - ${index}`;
  }
}
