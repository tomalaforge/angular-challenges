import {
  ChangeDetectionStrategy,
  Component,
  effect,
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

  constructor() {
    /*
      if we use `if (this.drive() || this.ram() || this.gpu())`,
      when the drive is selected, this `this.drive()` will be evaluated to true,
      and the short circuit will happen. So the rest this.ram() || this.gpu() in the `if` statement
      is not evaluated. And Angular will understand that this effect only depends on the `drive` signal.
      That's why when we select the second checkbox again, there's nothing happens.
      The rule of thumbs is always express the signal dependency explicitly.
    */
    effect(() => {
      const drive = this.drive();
      const ram = this.ram();
      const gpu = this.gpu();

      if (drive || ram || gpu) {
        alert('Price increased!');
      }
    });
  }
}
