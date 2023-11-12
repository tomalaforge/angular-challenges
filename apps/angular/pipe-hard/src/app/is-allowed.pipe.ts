import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

@Pipe({
  name: 'isAllowed',
  standalone: true,
})
export class IsAllowedPipe implements PipeTransform {
  transform = PersonUtils.isAllowed;
}
