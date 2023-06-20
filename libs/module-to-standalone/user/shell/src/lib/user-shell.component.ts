import { TOKEN } from '@angular-challenges/module-to-standalone/core/providers';
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-user-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    -- User Panel --
    <div class="flex gap-2 items-center">
      <button
        routerLink="home"
        class="border px-4 py-2 border-blue-400 rounded-md">
        Home
      </button>
      <button
        routerLink="contact"
        class="border px-4 py-2 border-blue-400 rounded-md">
        Contact
      </button>
      More buttons ...
    </div>
    <router-outlet></router-outlet>
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
  constructor(@Inject(TOKEN) public token: string) {}
}
