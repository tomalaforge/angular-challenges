import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<T, F extends (...args: never[]) => T>(
    func: F,
    ...args: Parameters<F>
  ): T {
    return func(...args);
  }
}
