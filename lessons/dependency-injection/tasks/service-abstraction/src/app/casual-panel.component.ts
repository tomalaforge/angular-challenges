import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GreetingService, CasualGreetingService } from './greeting.service';

@Component({
  selector: 'app-casual-panel',
  imports: [FormsModule],
  providers: [
    // TODO: предоставь CasualGreetingService как реализацию GreetingService
    // { provide: GreetingService, useClass: ??? }

  ],
  template: `
    <div class="panel casual">
      <h2>Casual context</h2>
      <p class="subtitle">Uses <code>CasualGreetingService</code></p>

      <div class="controls">
        <input [(ngModel)]="name" placeholder="Введи имя" />
        <button (click)="greet()">Поздороваться</button>
      </div>

      @if (result()) {
        <p class="result">{{ result() }}</p>
      }
    </div>
  `,
  styles: [
    `
      .panel {
        background: white;
        border-radius: 8px;
        padding: 1.5rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      .casual {
        border-top: 4px solid #ea580c;
      }
      h2 {
        font-size: 1.1rem;
        color: #ea580c;
        margin-bottom: 0.25rem;
      }
      .subtitle {
        font-size: 0.8rem;
        color: #888;
        margin-bottom: 1rem;
      }
      .controls {
        display: flex;
        gap: 0.5rem;
      }
      input {
        flex: 1;
        padding: 0.5rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        font-size: 0.95rem;
      }
      button {
        padding: 0.5rem 1rem;
        background: #ea580c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.95rem;
      }
      button:hover {
        background: #c2410c;
      }
      .result {
        margin-top: 1rem;
        padding: 0.75rem 1rem;
        background: #fff7ed;
        border-radius: 4px;
        font-style: italic;
        color: #7c2d12;
      }
      code {
        background: #f0f0f0;
        padding: 1px 4px;
        border-radius: 3px;
        font-size: 0.85em;
      }
    `,
  ],
})
export class CasualPanelComponent {
  private greeting = inject(GreetingService);

  name = signal('');
  result = signal('');

  greet(): void {
    if (this.name()) {
      this.result.set(this.greeting.greet(this.name()));
    }
  }
}
