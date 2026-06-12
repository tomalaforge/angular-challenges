import { Component } from '@angular/core';
import { CasualPanelComponent } from './casual-panel.component';
import { FormalPanelComponent } from './formal-panel.component';

@Component({
  imports: [FormalPanelComponent, CasualPanelComponent],
  selector: 'app-root',
  template: `
    <h1>Abstract Service — useClass</h1>
    <p class="description">
      Оба компонента инжектируют <code>GreetingService</code>, но должны получать
      разные реализации. Заполни <code>providers</code> в каждом компоненте.
    </p>
    <p class="info">
      Загляни в консоль, если не появились компоненты
    </p>
    <div class="grid">
      <app-formal-panel></app-formal-panel>
      <app-casual-panel></app-casual-panel>
    </div>
  `,
  styles: [
    `
      h1 {
        font-size: 1.5rem;
        margin-bottom: 0.75rem;
      }

      .description {
        color: #555;
        margin-bottom: 1.5rem;
        max-width: 600px;
        line-height: 1.5;
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        max-width: 700px;
      }

      .info {
        color: #555;
        font-size: 0.85rem;
        padding: 0.5rem 0.75rem;
        background: #cae8f8;
        border-left: 3px solid #34ace1;
        border-radius: 0 4px 4px 0;
        margin-bottom: 1.5rem;
        max-width: 600px;
      }

      code {
        background: #f0f0f0;
        padding: 1px 4px;
        border-radius: 3px;
        font-size: 0.9em;
      }
    `,
  ],
})
export class AppComponent {}
