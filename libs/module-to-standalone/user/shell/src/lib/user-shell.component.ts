import { TOKEN } from '@angular-challenges/module-to-standalone/core/providers';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-user-shell',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    -- User Panel --
    <div class="flex items-center gap-2">
      <button
        routerLink="home"
        class="rounded-md border border-blue-400 px-4 py-2">
        Home
      </button>
      <button
        routerLink="contact"
        class="rounded-md border border-blue-400 px-4 py-2">
        Contact
      </button>
      More buttons ...
    </div>
    <router-outlet />
    <section>
      LoadedToken
      {{ token }}
    </section>
  `,
  host: {
    class: 'flex flex-col p-4 gap-3 border border-blue',
  },
})
export class UserShellComponent {
  token = inject(TOKEN);
}
