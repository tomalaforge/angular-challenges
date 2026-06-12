import { Component } from '@angular/core';
import { CardComponent } from './card.component';
import { ThemedBlockComponent } from './themed-block.component';

@Component({
  imports: [CardComponent, ThemedBlockComponent],
  selector: 'app-root',
  template: `
    <h1>viewProviders vs providers</h1>

    <p class="description">
      Нажми <strong>Change color</strong> и посмотри — меняется ли цвет у
      <em>projected content</em> внутри карточки?
    </p>

    <app-card>
      <app-themed-block></app-themed-block>
    </app-card>

    <div class="hint">
      <p>
        <strong>Сейчас:</strong> оба блока меняют цвет — projected content получает
        <code>ThemeService</code> карточки через <code>providers</code>.
      </p>
      <p>
        <strong>После исправления:</strong> меняется только карточка — projected content
        использует root <code>ThemeService</code> (цвет остаётся <em>blue</em>).
      </p>
    </div>
  `,
  styles: [
    `
      h1 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      .description {
        margin-bottom: 1.5rem;
        color: #444;
        max-width: 480px;
      }
      .hint {
        margin-top: 1.5rem;
        max-width: 480px;
        padding: 1rem;
        background: #e8f4fd;
        border: 1px solid #90caf9;
        border-radius: 6px;
        font-size: 0.9rem;
        line-height: 1.6;
      }
      .hint p + p {
        margin-top: 0.5rem;
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
