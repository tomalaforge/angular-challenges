import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'utilFunc',
  standalone: true,
})
export class UtilFuncPipe implements PipeTransform {
  transform<T extends (...params: Parameters<T>) => R, R>(
    func: T,
    ...args: Parameters<T>
  ): R {
    return func.apply(func, args);
  }
}
