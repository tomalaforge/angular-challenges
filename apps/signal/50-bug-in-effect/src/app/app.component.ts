import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  model,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <section class="flex gap-5">
      <p>MacBook</p>
      <p>1999,99 €</p>
    </section>

    <section>
      <p>Extras:</p>

      <div>
        <input type="checkbox" [(ngModel)]="drive" />
        +500 GB drive-space
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="ram" />
        +4 GB RAM
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="gpu" />
        Better GPU
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly drive = model(false);
  protected readonly ram = model(false);
  protected readonly gpu = model(false);

  private readonly currentNoSelected = signal(0);

  private readonly noOfModelsSelected = computed(
    () =>
      [this.drive(), this.ram(), this.gpu()].filter((model) => model).length,
  );

  private prev = this.currentNoSelected();

  constructor() {
    effect(() => {
      const valueNow = this.noOfModelsSelected();
      const shouldFireAlert = valueNow > this.prev;
      if (shouldFireAlert) {
        alert('Price increased!');
      }
      this.prev = valueNow;
      this.currentNoSelected.set(valueNow);
    });
  }
}
