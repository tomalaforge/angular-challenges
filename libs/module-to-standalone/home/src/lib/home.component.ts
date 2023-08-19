import { TOKEN } from '@angular-challenges/module-to-standalone/core/providers';
import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [AsyncPipe],
  template: `Home component

    <section class="flex gap-5 items-center">
      Authorization :
      <button class="border p-2  " (click)="authorizeService.authorize()">
        Authorize
      </button>
      <button class="border p-2  " (click)="authorizeService.forbid()">
        Forbid
      </button>
      (isAuthorized: {{ authorizeService.isAuthorized$ | async }})
    </section>

    <section>LoadedToken {{ token }}</section> `,
})
export default class HomeComponent {
  authorizeService = inject(AuthorizationService);
  token = inject(TOKEN);
}
