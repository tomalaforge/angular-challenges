import { Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-themed-block',
  template: `
    <div class="block" [style.border-color]="theme.color()">
      <span class="label">PROJECTED CONTENT</span>
      <p>
        ThemeService color: <strong [style.color]="theme.color()">{{ theme.color() }}</strong>
      </p>
    </div>
  `,
  styles: [
    `
      .block {
        padding: 1rem;
        border: 3px solid;
        border-radius: 6px;
        background: white;
      }
      .label {
        display: block;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        color: #888;
        margin-bottom: 0.4rem;
      }
    `,
  ],
})
export class ThemedBlockComponent {
  theme = inject(ThemeService);
}
