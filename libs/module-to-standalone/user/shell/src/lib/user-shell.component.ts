import { TOKEN } from '@angular-challenges/module-to-standalone/core/providers';
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'lib-user-shell',
  host: {
    class: 'flex flex-col p-4 gap-3 border border-blue',
  },
  templateUrl: './user-shell.component.html',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
})
export class UserShellComponent {
  constructor(@Inject(TOKEN) public token: string) {}
}
