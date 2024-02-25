import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ButtonComponent } from './button.component';
import { InformationComponent } from './information.component';
import {
  User,
  admin,
  client,
  everyone,
  manager,
  reader,
  readerAndWriter,
  writer,
} from './user.model';
import { UserStore } from './user.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InformationComponent, RouterLink, ButtonComponent],
  template: `
    <header class="flex items-center gap-3">
      Log as :
      <button app-button (click)="select(admin)">Admin</button>
      <button app-button (click)="select(manager)">Manager</button>
      <button app-button (click)="select(reader)">Reader</button>
      <button app-button (click)="select(writer)">Writer</button>
      <button app-button (click)="select(readerAndWriter)">
        Reader and Writer
      </button>
      <button app-button (click)="select(client)">Client</button>
      <button app-button (click)="select(everyone)">Everyone</button>
    </header>

    <app-information></app-information>

    <button app-button class="mt-10" routerLink="enter">
      Enter application
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly userStore = inject(UserStore);

  readonly admin = admin;
  readonly manager = manager;
  readonly reader = reader;
  readonly writer = writer;
  readonly readerAndWriter = readerAndWriter;
  readonly client = client;
  readonly everyone = everyone;

  select(role: User): void {
    this.userStore.select(role);
  }
}
