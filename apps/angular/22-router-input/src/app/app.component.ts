import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  imports: [RouterLink, RouterModule, ReactiveFormsModule],
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="form-group">
        <label for="userName">UserName</label>
        <input id="userName" type="text" [formControl]="userName" />
      </div>
      <div class="form-group">
        <label for="testId">TestId</label>
        <input id="testId" type="number" [formControl]="testId" />
      </div>
      <div class="button-group">
        <button
          class="primary"
          [routerLink]="'subscription/' + testId.value"
          [queryParams]="{ user: userName.value }">
          Test
        </button>
        <button routerLink="/" class="secondary">HOME</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 600px;
        margin: 2rem auto;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .form-group {
        margin-bottom: 1rem;
      }
      label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: #495057;
      }
      input {
        width: 100%;
        padding: 0.5rem;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 1rem;
      }
      .button-group {
        margin-top: 1.5rem;
        display: flex;
        gap: 1rem;
      }
      button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: opacity 0.2s;
      }
      button:hover {
        opacity: 0.9;
      }
      .primary {
        background: #0d6efd;
        color: white;
      }
      .secondary {
        background: #6c757d;
        color: white;
      }
    `,
  ],
})
export class AppComponent {
  userName = new FormControl('');
  testId = new FormControl(0);
}
