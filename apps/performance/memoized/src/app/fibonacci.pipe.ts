import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'fibonacci',
})
export class FibonacciPipe implements PipeTransform {
  transform(value: number) {
    return this.fibonacci(value - 1) + this.fibonacci(value - 2);
  }

  private fibonacci(num: number): number {
    if (num === 1 || num === 2) {
      return 1;
    }

    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }
}
