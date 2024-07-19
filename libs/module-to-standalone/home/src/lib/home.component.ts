import { TOKEN } from '@angular-challenges/module-to-standalone/core/providers';
import { AuthorizationService } from '@angular-challenges/module-to-standalone/core/service';
import { AsyncPipe } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'lib-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [AsyncPipe],
})
export class HomeComponent {
  constructor(
    public authorizeService: AuthorizationService,
    @Inject(TOKEN) public token: string,
  ) {}
}
