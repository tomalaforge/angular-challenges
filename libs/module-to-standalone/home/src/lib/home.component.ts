import { TOKEN } from '@angular-challenges/module-to-standalone/core/providers';
import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'lib-home',
  template: `
    Home component

    <section class="flex items-center gap-5">
      Authorization :
      <button class="border p-2  " (click)="authorizeService.authorize()">
        Authorize
      </button>
      <button class="border p-2  " (click)="authorizeService.forbid()">
        Forbid
      </button>
      (isAuthorized: {{ authorizeService.isAuthorized$ | async }})
    </section>

    <section>LoadedToken {{ token }}</section>
  `,
  standalone: true,
  imports: [AsyncPipe],
})
export class HomeComponent {
  constructor(
    public authorizeService: AuthorizationService,
    @Inject(TOKEN) public token: string,
  ) {}
}
