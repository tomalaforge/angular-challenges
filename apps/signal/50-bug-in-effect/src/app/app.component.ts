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
      It occurs because of the place of each signal triggered in the OR condition : the order of the trigger in the condition matter.
      If the triggered one is after the one who is already set as true, it will not trigger the alert because, for the condition value didn't change.
      Else if the triggered one is before the one who is already set as true, it will trigger the alert.
      We must separate the condition into three effect, a condition for each effect.

      Want to understand the way to do it with the computed solution. Any clue ?
    */

    effect(() => {
      this.drive() ? alert('Price increased') : undefined;
    });

    effect(() => {
      this.ram() ? alert('Price increased') : undefined;
    });

    effect(() => {
      this.gpu() ? alert('Price increased') : undefined;
    });
  }
}
