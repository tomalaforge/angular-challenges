import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SCENARIOS } from './scenarios';
import { ScenarioShellComponent } from './shared/scenario-shell/scenario-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgComponentOutlet, ScenarioShellComponent],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <div class="app-header__title">
          <span class="badge badge--violet">Интерактивная практика</span>
          <h1>RxJS Playground</h1>
        </div>
        <div class="app-header__scenario">
          <strong>Сценарий:</strong>
          @if (currentScenario(); as cur) {
            {{ cur.meta.name }}
          }
        </div>
      </header>

      <div class="scenario-grid">
        <aside class="sidebar" aria-label="Список сценариев">
          <h2>Сценарии</h2>
          <nav>
            <ul>
              @for (s of scenarios; track s.meta.id) {
                <li>
                  <button
                    type="button"
                    [class.is-active]="currentScenarioId() === s.meta.id"
                    (click)="select(s.meta.id)"
                  >
                    <strong>{{ s.meta.name }}</strong>
                    <small>{{ s.meta.summary }}</small>
                    <span class="badge-list">
                      @for (op of s.meta.operators; track op) {
                        <span class="badge badge--cyan">{{ op }}</span>
                      }
                    </span>
                  </button>
                </li>
              }
            </ul>
          </nav>
        </aside>

        <main class="main-area">
          @if (currentScenario(); as current) {
            <section class="scenario-meta">
              <div>
                <strong>Лекция:</strong>
                @for (ref of current.meta.lectureRefs; track ref) {
                  <span class="badge badge--amber">{{ ref }}</span>
                }
              </div>
              <div>
                <strong>Операторы:</strong>
                @for (op of current.meta.operators; track op) {
                  <span class="badge badge--violet">{{ op }}</span>
                }
              </div>
            </section>
          }
          <app-scenario-shell>
            @if (currentScenario(); as current) {
              <ng-container
                *ngComponentOutlet="current.component"
              />
            }
          </app-scenario-shell>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .app-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: var(--color-bg-elev);
        border-bottom: 1px solid var(--color-border);
      }
      .app-header__title {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .app-header__title h1 {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
      }
      .sidebar h2 {
        margin: 0 0 12px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: var(--color-text-dim);
      }
      .sidebar ul {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .sidebar button {
        width: 100%;
        text-align: left;
        background: transparent;
        border: 1px solid transparent;
        border-radius: var(--radius-md);
        padding: 8px 10px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        cursor: pointer;
      }
      .sidebar button:hover {
        background: var(--color-bg-elev-2);
      }
      .sidebar button.is-active {
        border-color: var(--color-cyan);
        background: var(--color-bg-elev-2);
      }
      .sidebar small {
        color: var(--color-text-dim);
        font-size: 11.5px;
      }
      .badge-list {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
      }
      .scenario-meta {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        padding: 10px 12px;
        background: var(--color-bg-elev);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .scenario-meta strong {
        margin-right: 6px;
        color: var(--color-text-dim);
      }
    `,
  ],
})
export class AppComponent {
  protected readonly scenarios = SCENARIOS;
  protected readonly currentScenarioId = signal(SCENARIOS[0]?.meta.id ?? '');

  protected currentScenario() {
    return this.scenarios.find((s) => s.meta.id === this.currentScenarioId());
  }

  protected select(id: string): void {
    this.currentScenarioId.set(id);
  }
}
