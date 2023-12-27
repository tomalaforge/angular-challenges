import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fibonacci',
  standalone: true,
})
export class FibonacciPipe implements PipeTransform {
  readonly STORAGE_KEY = 'FIBO';

  getNFibonacci(num: number): number {
    const result = localStorage.getItem(`${this.STORAGE_KEY}${num}`);
    return result ? Number.parseInt(result) : this.fibonacci(num);
  }

  setNFibonacci(num: number, result: number): void {
    localStorage.setItem(`${this.STORAGE_KEY}${num}`, `${result}`);
  }

  fibonacci(num: number): number {
    if (num === 1 || num === 2) {
      return 1;
    }
    const result = this.getNFibonacci(num - 1) + this.getNFibonacci(num - 2);
    this.setNFibonacci(num, result);
    return result;
  }

  transform(num: number): number {
    return this.fibonacci(num);
  }
}
