import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ standalone: true, name: 'wrapFn' })
export class WrapFnPipe implements PipeTransform {
  transform<Result, F extends (...args: never[]) => Result>(
    func: F,
    ...args: Parameters<F>
  ): Result {
    return func(...args);
  }
}
