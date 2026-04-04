import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <a class="text-blue-600 underline" routerLink="/">Back to Home</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class DashboardComponent {}
