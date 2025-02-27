import { Pipe, PipeTransform } from '@angular/core';

type AnyFunction = (...args: any[]) => any;

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<TFn extends AnyFunction>(
    fn: TFn,
    ...args: Parameters<TFn>
  ): ReturnType<TFn> {
    return fn(...args);
  }
}
