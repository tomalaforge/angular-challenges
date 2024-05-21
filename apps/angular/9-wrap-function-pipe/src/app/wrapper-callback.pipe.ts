import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wrapperCallback', standalone: true })
export class WrapperCallbackPipe implements PipeTransform {
  transform<T, Y extends Record<string, unknown>>(
    value: T,
    params: Y,
    callback: (k: Y) => void,
  ) {
    if (typeof callback === 'function') {
      return callback(params);
    }

    return value;
  }
}
