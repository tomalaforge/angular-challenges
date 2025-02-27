import { Component } from '@angular/core';
import { UserComponent } from './user.component';

@Component({
  standalone: true,
  imports: [UserComponent],
  selector: 'app-root',
  template: `
    <div class="card">
      <h2 class="mb-6 text-2xl font-bold text-gray-800">
        Tennis Player Registration
      </h2>

      <form class="space-y-4">
        <div class="form-group">
          <label class="form-label">Name</label>
          <input #name class="form-input" placeholder="Enter name" />
          @if (showUser && !name.value) {
            <p class="text-sm text-red-500">Name is required</p>
          }
        </div>

        <div class="form-group">
          <label class="form-label">Last Name</label>
          <input #lastName class="form-input" placeholder="Enter last name" />
        </div>

        <div class="form-group">
          <label class="form-label">Age</label>
          <input
            type="number"
            #age
            class="form-input"
            placeholder="Enter age" />
        </div>

        <button (click)="showUser = true" type="button" class="btn-primary">
          Register Player
        </button>
      </form>

      @if (showUser && !!name.value) {
        <div class="success-box">
          <app-user
            [name]="name.value"
            [lastName]="lastName.value"
            [age]="age.value" />
        </div>
      }
    </div>
  `,
  host: {
    class: 'block p-6 min-h-screen bg-gray-50',
  },
})
export class AppComponent {
  showUser = false;
}
