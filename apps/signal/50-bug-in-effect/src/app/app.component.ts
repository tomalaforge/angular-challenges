import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  linkedSignal,
  model,
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
  drive = model(false);
  ram = model(false);
  gpu = model(false);
  // How many active checkboxes we currently have
  countActive = computed<number>(() => {
    let count = 0;
    if (this.drive()) {
      count += 1;
    }
    if (this.ram()) {
      count += 1;
    }
    if (this.gpu()) {
      count += 1;
    }
    return count;
  });
  // If we have more checkboxes than before we should show the alert
  showAlert = linkedSignal<number, boolean>({
    source: this.countActive,
    computation: (sourceValue, previous) => {
      return this.countActive() > (previous?.source || 0);
    },
  });
  constructor() {
    effect(() => {
      // on each countActive change we check if showAlert is true
      if (this.countActive() > 0 && this.showAlert()) {
        alert('Price increased!');
      }
    });
  }
}
