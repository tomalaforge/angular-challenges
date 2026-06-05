import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-a',
  template: `
    <button
      class="mb-4 rounded bg-gray-400 px-4 py-2 text-white"
      routerLink="/">
      Back
    </button>
    <h2>Page A (Admin)</h2>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class AdminPage {}
