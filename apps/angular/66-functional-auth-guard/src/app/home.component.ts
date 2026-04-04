import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 class="text-3xl font-bold">Home</h1>

      <p class="text-gray-600">
        Status:
        <span class="font-semibold">
          {{ authService.isLoggedIn() ? 'Logged in as ' + authService.role() : 'Not logged in' }}
        </span>
      </p>

      <div class="flex gap-3">
        <button
          class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          (click)="authService.login('user')">
          Login as User
        </button>
        <button
          class="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          (click)="authService.login('admin')">
          Login as Admin
        </button>
        <button
          class="rounded bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
          (click)="authService.logout()">
          Logout
        </button>
      </div>

      <div class="flex gap-4">
        <a class="text-blue-600 underline" routerLink="/dashboard">Go to Dashboard</a>
        <a class="text-blue-600 underline" routerLink="/admin">Go to Admin</a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class HomeComponent {
  protected authService = inject(AuthService);
}
