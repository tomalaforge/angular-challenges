import { Pipe, type PipeTransform } from '@angular/core';
import { City } from '../../model/city.model';
import { Student } from '../../model/student.model';
import { Teacher } from '../../model/teacher.model';

@Pipe({
  name: 'appDisplayName',
})
export class DisplayNamePipe implements PipeTransform {
  transform(item: Student | City | Teacher): string {
    if ('firstName' in item) return item.firstName;
    if ('name' in item) return item.name;
    return '';
  }
}
