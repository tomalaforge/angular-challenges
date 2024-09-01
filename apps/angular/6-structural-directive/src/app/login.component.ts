import { Component } from '@angular/core';
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
import { UserService } from './user.service';

@Component({
  standalone: true,
  imports: [InformationComponent, RouterLink, ButtonComponent],
  providers: [UserService],
  selector: 'app-login',
  template: `
    <header class="flex items-center gap-3">
      Log as :
      <button (click)="userService.setUser(manager)">Set Manager</button>
      <button (click)="userService.setUser(writer)">Set Writer</button>
      <button (click)="userService.setUser(reader)">Set Reader</button>
      <button (click)="userService.setUser(readerAndWriter)">Set Reader and Writer</button>
      <button (click)="userService.setUser(client)">Set Client</button>
      <button (click)="userService.setUser(admin)">Set Admin</button>
      <button (click)="userService.setUser(everyone)">Set Everyone</button>
    </header>

    <app-information></app-information>

    <button app-button class="mt-10" routerLink="enter">
      Enter application
    </button>
  `,
})
export class LoginComponent {
  constructor(public userService: UserService) {}
}
