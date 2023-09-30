import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFunctionPipe implements PipeTransform {
  transform<Fn extends (...args: any[]) => ReturnType<Fn>>(
    fn: Fn,
    ...args: Parameters<Fn>
  ): ReturnType<Fn> {
    return fn(...args);
  }
}
