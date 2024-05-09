import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utils',
  standalone: true,
})
export class UtilsPipe<T> implements PipeTransform {
  transform(fn: (...args: T[]) => void, args: T[]) {
    return fn.call(null, ...args);
  }
}
