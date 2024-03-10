import { Component } from '@angular/core';
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

    <app-information [userRole]="this.userRole"></app-information>

    <button app-button class="mt-10" routerLink="enter">
      Enter application
    </button>
  `,
})
export class LoginComponent {
  userRole: User | undefined = {} as User;
  constructor(private userStore: UserStore) {
    this.userStore.user$.pipe().subscribe((p) => {
      this.userRole = p;
    });
  }

  admin() {
    this.userStore.add(admin);
    console.log('admin');
  }
  manager() {
    this.userStore.add(manager);
    console.log('manager');
  }
  reader() {
    this.userStore.add(reader);
    console.log('reader');
  }
  writer() {
    this.userStore.add(writer);
    console.log('writer');
  }
  readerWriter() {
    this.userStore.add(readerAndWriter);
    console.log('readerandwriter');
  }
  client() {
    this.userStore.add(client);
    console.log('client');
  }
  everyone() {
    this.userStore.add(everyone);
    console.log('everyone');
  }
}
