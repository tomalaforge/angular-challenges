import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from './button.component';
import { InformationComponent } from './information.component';
import {
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
  standalone: true,
  imports: [InformationComponent, RouterLink, ButtonComponent],
  selector: 'app-login',
  template: `
    <header class="flex items-center gap-3">
      Log as :
      <button app-button (click)="admin()">Admin</button>
      <button app-button (click)="manager()">Manager</button>
      <button app-button (click)="reader()">Reader</button>
      <button app-button (click)="writer()">Writer</button>
      <button app-button (click)="readerWriter()">Reader and Writer</button>
      <button app-button (click)="client()">Client</button>
      <button app-button (click)="everyone()">Everyone</button>
    </header>

    <app-information></app-information>

    <button app-button class="mt-10" routerLink="enter">
      Enter application
    </button>
  `,
})
export class LoginComponent {
  userStore = inject(UserStore);

  admin() {
    this.userStore.updateUser(admin);
  }
  manager() {
    this.userStore.updateUser(manager);
  }
  reader() {
    this.userStore.updateUser(reader);
  }
  writer() {
    this.userStore.updateUser(writer);
  }
  readerWriter() {
    this.userStore.updateUser(readerAndWriter);
  }
  client() {
    this.userStore.updateUser(client);
  }
  everyone() {
    this.userStore.updateUser(everyone);
  }
}
