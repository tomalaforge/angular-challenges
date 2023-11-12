import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

@Pipe({
  name: 'showName',
  standalone: true,
})
export class ShowNamePipe implements PipeTransform {
  transform = PersonUtils.showName;
}
