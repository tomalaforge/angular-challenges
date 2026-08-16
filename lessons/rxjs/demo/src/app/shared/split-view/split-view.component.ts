import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Двухколоночный layout: слева «без операторов», справа «с операторами».
 * Контент передаётся через content projection в слоты `#imperative` и `#reactive`.
 */
@Component({
  selector: 'app-split-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="split-view">
      <div class="lane lane--imperative">
        <header class="lane__header">
          <span class="badge badge--coral">{{ imperativeTitle() }}</span>
        </header>
        <div class="lane__body">
          <ng-content select="[slot=imperative]" />
        </div>
      </div>
      <div class="lane lane--reactive">
        <header class="lane__header">
          <span class="badge badge--cyan">{{ reactiveTitle() }}</span>
        </header>
        <div class="lane__body">
          <ng-content select="[slot=reactive]" />
        </div>
      </div>
    </div>
  `,
})
export class SplitViewComponent {
  readonly imperativeTitle = input<string>('Без операторов');
  readonly reactiveTitle = input<string>('С операторами');
}
