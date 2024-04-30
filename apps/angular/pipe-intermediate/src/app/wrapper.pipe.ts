import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showName',
  standalone: true,
})
export class ShowNamePipe implements PipeTransform {
  transform(name: string, index: number): string {
    return `${name} - ${index}`;
  }
}

@Pipe({
  name: 'isAllowed',
  standalone: true,
})
export class IsAllowedPipe implements PipeTransform {
  transform(age: number, isFirst: boolean): string {
    return isFirst ? 'always allowed' : age > 25 ? 'allowed' : 'declined';
  }
}
