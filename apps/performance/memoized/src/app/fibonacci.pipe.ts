import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fibonacci',
  standalone: true,
})
export class FibonacciPipe implements PipeTransform {
  transform(n: number): number {
    return fibonacci(n);
  }
}

// The iterative approach for calculating Fibonacci numbers is generally more efficient in terms of time complexity and avoids the stack overhead associated with recursion
const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }

  let a = 1,
    b = 1,
    c = 0;

  for (let i = 3; i <= num; i++) {
    c = a + b;
    a = b;
    b = c;
  }

  return c;
};
