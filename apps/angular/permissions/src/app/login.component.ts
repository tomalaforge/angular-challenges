import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from './button.component';
import { InformationComponent } from './information.component';
import { UserType, types } from './user.model';
import { UserStore } from './user.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InformationComponent, RouterLink, ButtonComponent],
  template: `
    <header class="flex items-center gap-3">
      Log as :
      <button app-button (click)="select('admin')">Admin</button>
      <button app-button (click)="select('manager')">Manager</button>
      <button app-button (click)="select('reader')">Reader</button>
      <button app-button (click)="select('writer')">Writer</button>
      <button app-button (click)="select('readerAndWriter')">
        Reader and Writer
      </button>
      <button app-button (click)="select('client')">Client</button>
      <button app-button (click)="select('everyone')">Everyone</button>
    </header>

    <app-information></app-information>

    <button app-button class="mt-10" routerLink="enter">
      Enter application
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private readonly store = inject(UserStore);

  select(type: UserType): void {
    const userType = types.find((t) => t.name === type);
    if (userType) {
      this.store.select(userType);
    } else {
      throw Error('user type not found');
    }
  }
}
