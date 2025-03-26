import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { randCountry, randFirstName, randLastName } from '@ngneat/falso';
import { UserComponent } from './user.component';
import type { User } from './user.model';

export const randUser = (): User => ({
  name: randFirstName(),
  lastName: randLastName(),
  country: randCountry(),
});

@Component({
  selector: 'sdi-users',
  imports: [UserComponent, MatTableModule],
  template: `
    <h1 class="mt-4 text-xl">List of Users</h1>
    <table mat-table [dataSource]="dataSource">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let user"><sdi-user [user]="user" /></td>
      </ng-container>

      <ng-container matColumnDef="country">
        <th mat-header-cell *matHeaderCellDef>Country</th>
        <td mat-cell *matCellDef="let user">{{ user.country }}</td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
  `,
  host: {
    class: 'flex flex-col',
  },
})
export default class UsersComponent {
  private users = [
    randUser(),
    randUser(),
    randUser(),
    randUser(),
    randUser(),
    randUser(),
  ];
  displayedColumns: string[] = ['name', 'country'];
  dataSource = this.users;
}
