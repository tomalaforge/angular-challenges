import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform',
  standalone: true,
})
export class TransformPipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}

@Pipe({
  name: 'isAllow',
  standalone: true,
})
export class IsAllowPipe implements PipeTransform {
  transform(age: number, isFirst: boolean): any {
    if (isFirst) {
      return 'always allowed';
    } else {
      return age > 25 ? 'allowed' : 'declined';
    }
  }
}
