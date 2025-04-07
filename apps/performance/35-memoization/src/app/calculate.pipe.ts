import { Pipe, PipeTransform } from '@angular/core';
import { fibonacci } from './person-list.component';

@Pipe({
  name: 'calculate',
})
export class CalculatePipe implements PipeTransform {
  transform(value: number): number {
    console.log('Calculating...');
    return fibonacci(value);
  }
}
