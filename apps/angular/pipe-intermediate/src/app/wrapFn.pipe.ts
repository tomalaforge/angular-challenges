import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class WrapFn implements PipeTransform {
  transform<T>(value: (...args: any[]) => T, ...args: any[]): T {
    return value(...args);
  }
}
