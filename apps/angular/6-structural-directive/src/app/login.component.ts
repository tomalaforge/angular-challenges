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

    <app-information />

    <button app-button class="mt-10" routerLink="enter">
      Enter application
    </button>
  `,
})
export class LoginComponent {
  private readonly userStore = inject(UserStore);

  admin() {
    this.userStore.add(admin);
  }
  manager() {
    this.userStore.add(manager);
  }
  reader() {
    this.userStore.add(reader);
  }
  writer() {
    this.userStore.add(writer);
  }
  readerWriter() {
    this.userStore.add(readerAndWriter);
  }
  client() {
    this.userStore.add(client);
  }
  everyone() {
    this.userStore.add(everyone);
  }
}
