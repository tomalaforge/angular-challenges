import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
})
export class WrapFnPipe implements PipeTransform {
  transform<T, U>(fn: (...args: any[]) => T, ...args: U[]): T {
    return fn(...args);
  }
}
