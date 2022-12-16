import { NxWelcomeComponent } from './nx-welcome.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent],
  selector: 'app-root',
  template: ` <app-nx-welcome></app-nx-welcome> `,
  styles: [],
})
export class AppComponent {
  title = 'rxjs-race-condition';
}
