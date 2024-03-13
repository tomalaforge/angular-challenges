import { Pipe, PipeTransform } from '@angular/core';
import { fibonacci } from './person-list.component';

@Pipe({
  standalone: true,
  name: 'calculate',
})
export class CalculatePipe implements PipeTransform {
  transform(value: number): number {
    return fibonacci(value);
  }
}
