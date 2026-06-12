import { Component, inject } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-card',
  providers: [ThemeService],
  template: `
    <div class="card" [style.border-color]="theme.color()">
      <div class="card-header" [style.background-color]="theme.color()">
        <div>
          <span class="label">CARD INTERNAL</span>
          <span>ThemeService color: <strong>{{ theme.color() }}</strong></span>
        </div>
        <button (click)="theme.nextColor()">Change color</button>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        border: 3px solid;
        border-radius: 8px;
        overflow: hidden;
        background: white;
        max-width: 480px;
      }
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        color: white;
      }
      .card-body {
        padding: 1rem;
      }
      .label {
        display: block;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        opacity: 0.8;
      }
      button {
        padding: 0.4rem 0.9rem;
        border: 2px solid white;
        border-radius: 4px;
        background: transparent;
        color: white;
        font-weight: 600;
        cursor: pointer;
      }
      button:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    `,
  ],
})
export class CardComponent {
  theme = inject(ThemeService);
}
