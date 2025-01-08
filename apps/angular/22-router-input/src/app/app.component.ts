import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
    <label for="userName">UserName</label>
    <input id="userName" type="text" [formControl]="userName" />
    <label for="testId">TestId</label>
    <input id="testId" type="number" [formControl]="testId" />
    <button
      [routerLink]="'subscription/' + testId.value"
      [queryParams]="{ user: userName.value }">
      Test
    </button>
    <button routerLink="/">HOME</button>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  userName = new FormControl();
  testId = new FormControl();
}
