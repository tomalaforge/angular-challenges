import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="space-y-4">
        <div class="form-group">
          <label for="userName">UserName</label>
          <input id="userName" type="text" [formControl]="userName" />
        </div>
        <div class="form-group">
          <label for="testId">TestId</label>
          <input id="testId" type="number" [formControl]="testId" />
        </div>
        <button
          [routerLink]="'subscription/' + testId.value"
          [queryParams]="{ user: userName.value }">
          Test
        </button>
        <button routerLink="/">HOME</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: `
    .form-group {
      display: grid;
      gap: 0.25rem;
    }

    .space-y-4 > * + * {
      margin-top: 1rem;
    }

    .container {
      width: min(65rem, calc(100% - 2rem));
      margin-inline: auto;
    }
  `,
})
export class AppComponent {
  userName = new FormControl();
  testId = new FormControl();
}
