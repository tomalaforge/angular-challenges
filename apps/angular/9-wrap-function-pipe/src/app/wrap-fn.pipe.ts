import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFnPipe implements PipeTransform {
  transform<R>(func: (...arg: any[]) => R, ...args: any[]): R {
    return func(...args);
  }
}
