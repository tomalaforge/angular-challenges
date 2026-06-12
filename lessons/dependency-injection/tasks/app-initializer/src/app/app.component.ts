import { Component, inject } from '@angular/core';
import { ConfigService } from './config.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="card">
      <h1>{{ config.config.appTitle }}</h1>
      <dl>
        <dt>API URL</dt>
        <dd>{{ config.config.apiUrl }}</dd>
        <dt>Theme</dt>
        <dd>{{ config.config.theme }}</dd>
      </dl>
      @if (config.config.apiUrl === 'NOT CONFIGURED') {
        <p class="hint">
          Видишь "NOT CONFIGURED"? Настрой <code>APP_INITIALIZER</code> в
          <code>app.config.ts</code> — и значения загрузятся до первого рендера.
        </p>
      }
    </div>
  `,
  styles: [
    `
      .card {
        max-width: 480px;
        background: white;
        border-radius: 8px;
        padding: 2rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      h1 {
        margin-bottom: 1.5rem;
        font-size: 1.5rem;
      }
      dl {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5rem 1rem;
        margin-bottom: 1.5rem;
      }
      dt {
        font-weight: 600;
        color: #555;
      }
      dd {
        font-family: monospace;
        font-size: 0.95rem;
      }
      .hint {
        padding: 0.75rem 1rem;
        background: #fff3cd;
        border: 1px solid #ffc107;
        border-radius: 4px;
        font-size: 0.9rem;
        line-height: 1.5;
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
export class AppComponent {
  config = inject(ConfigService);
}
