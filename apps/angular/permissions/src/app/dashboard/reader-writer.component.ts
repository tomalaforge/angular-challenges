import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  template: `
    <p>Dashboard for Reader and Writer works</p>
    <button app-button routerLink="/">Log out</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReaderWriterComponent {}
