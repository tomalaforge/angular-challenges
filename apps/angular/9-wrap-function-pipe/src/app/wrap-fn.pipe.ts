import { Pipe } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
  pure: true,
})
export class WrapFunctionPipe {
  transform<T extends (...args: any[]) => any>(
    fn: T,
    ...args: Parameters<T>
  ): ReturnType<T> {
    return fn(...args);
  }
}
