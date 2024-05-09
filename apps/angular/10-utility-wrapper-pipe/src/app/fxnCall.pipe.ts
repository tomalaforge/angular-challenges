import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'fxnCall',
})
export class FxnCallPipe implements PipeTransform {
  transform<RESULT, T extends (...params: Parameters<T>) => RESULT>(
    func: T,
    ...args: Parameters<T>
  ): RESULT {
    return func.call(func, ...args);
  }
}
