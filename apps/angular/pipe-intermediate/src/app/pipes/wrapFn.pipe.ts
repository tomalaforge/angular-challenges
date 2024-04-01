import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'wrapFn',
  standalone: true,
})
export class wrapFnPipe implements PipeTransform {
  transform(
    name: string,
    index: number,
    age: number,
    isFirst: boolean,
  ): string {
    return `${name} - ${index} ${isFirst ? 'always allowed' : age > 25 ? 'allowed' : 'declined'}`;
  }
}
