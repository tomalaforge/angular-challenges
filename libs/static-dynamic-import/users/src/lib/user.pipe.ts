import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.model';

@Pipe({
  name: 'user',
  standalone: true,
})
export class UserPipe implements PipeTransform {
  transform(user: User): string {
    return `${user.name} ${user.lastname} - ${user.country}`;
  }
}
