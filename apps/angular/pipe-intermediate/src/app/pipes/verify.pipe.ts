import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '../app.component';

@Pipe({
  name: 'verify',
  standalone: true,
})
export class VerifyPipe implements PipeTransform {
  transform(value: Person, index: number, isFirst?: boolean): string {
    let verdict = '';
    if (isFirst) {
      verdict = 'always allowed';
    } else {
      verdict = value.age > 25 ? 'allowed' : 'declined';
    }
    return `${value.name} - ${index} ${verdict}`;
  }
}
