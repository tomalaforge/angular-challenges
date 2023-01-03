import { Component } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';

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

// faire une app qui fonctionne mais pas dans les tests e2e à cause du délai de la requete http.
