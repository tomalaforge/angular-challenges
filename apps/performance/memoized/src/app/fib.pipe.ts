import { Pipe, PipeTransform } from '@angular/core';

const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};
@Pipe({
  standalone: true,
  name: 'Fibonacci',
})
export class FibonacciPipe implements PipeTransform {
  /**
   *
   * @param {}
   * @param fibObject
   * Cant create fibObject here because on every pipe call it is creating new object instance so creating from person-list
   * and sending from there.
   */
  transform(value: number, fibObject: any) {
    if (fibObject[value]) {
      return fibObject[value];
    }
    fibObject[value] = fibonacci(value);
    return fibonacci(value);
  }
}
