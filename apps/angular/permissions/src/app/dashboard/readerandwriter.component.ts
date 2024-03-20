import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-readerandwriter',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  template: `
    <p>dashboard for reader and writer works!</p>
    <button app-button routerLink="/">Logout</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReaderAndWriterDashboardComponent {}
