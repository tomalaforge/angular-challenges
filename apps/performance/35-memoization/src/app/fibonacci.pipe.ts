import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fibonacci',
})
export class FibonacciPipe implements PipeTransform {
  transform(num: number): number {
    return fibonacci(num);
  }
}

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};
