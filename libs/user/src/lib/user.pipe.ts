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

// https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-host-metadata-property.md
