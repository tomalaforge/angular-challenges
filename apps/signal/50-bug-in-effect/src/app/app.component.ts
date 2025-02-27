import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <div class="card">
      <div class="product-header">
        <h1 class="product-name">MacBook</h1>
        <span class="product-price">1999,99 €</span>
      </div>

      <section class="extras-section">
        <h2 class="extras-title">Available Extras</h2>

        <div class="checkbox-group">
          <input
            type="checkbox"
            id="drive"
            class="checkbox-input"
            [(ngModel)]="drive" />
          <label for="drive" class="checkbox-label">
            +500 GB drive-space (+299 €)
          </label>
        </div>

        <div class="checkbox-group">
          <input
            type="checkbox"
            id="ram"
            class="checkbox-input"
            [(ngModel)]="ram" />
          <label for="ram" class="checkbox-label">+4 GB RAM (+199 €)</label>
        </div>

        <div class="checkbox-group">
          <input
            type="checkbox"
            id="gpu"
            class="checkbox-input"
            [(ngModel)]="gpu" />
          <label for="gpu" class="checkbox-label">Better GPU (+499 €)</label>
        </div>
      </section>

      <p class="total-extras">Total extras selected: {{ totalExtras() }}</p>
    </div>
  `,
  host: {
    class: 'block p-6 min-h-screen bg-gray-50',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  drive = model(false);
  ram = model(false);
  gpu = model(false);

  totalExtras = computed(() => {
    return Number(this.drive()) + Number(this.ram()) + Number(this.gpu());
  });

  constructor() {
    // Fix: Track each signal independently
    effect(() => {
      // Force effect to track each signal individually
      const hasExtras = [this.drive(), this.ram(), this.gpu()].some(Boolean);
      if (hasExtras) {
        alert('Price increased!');
      }
    });

    /* Bug explanation for junior dev:
    The original implementation had a logical OR operation (||) which short-circuits.
    This means if this.drive() is true, the other signals (ram, gpu) aren't tracked
    by the effect because JavaScript stops evaluating the OR expression after finding
    the first true value.

    To fix this, we need to ensure all signals are tracked by the effect system.
    We can do this by either:
    1. Evaluating each signal separately before the logical operation
    2. Using an array and some() method (current solution)
    3. Using a computed signal (bonus solution)
    */
  }
}
