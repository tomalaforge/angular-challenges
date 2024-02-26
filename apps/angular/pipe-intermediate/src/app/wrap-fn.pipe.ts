import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe<T> implements PipeTransform {
  transform<R, F extends (...args: T[]) => R>(
    func: F,
    ...args: Parameters<F>
  ): R {
    return func(...args);
  }
}
