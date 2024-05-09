import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapperFn',
  standalone: true,
})
export class WrapperPipe implements PipeTransform {
  transform<T>(func: (...arg: any[]) => T, ...args: any[]): T {
    return func(...args);
  }
}
