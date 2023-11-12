import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isAllowed',
  standalone: true,
})
export class IsAllowedPipe implements PipeTransform {
  transform(age: number, isFirst: boolean): string {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}
