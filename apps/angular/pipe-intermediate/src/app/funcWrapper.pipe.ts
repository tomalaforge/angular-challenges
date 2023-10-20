import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'funcWrapper',
  standalone: true,
})
export class FuncWrapper implements PipeTransform {
  transform<T>(value: (...args: any[]) => T, ...args: any[]): T {
    return value(...args);
  }
}
