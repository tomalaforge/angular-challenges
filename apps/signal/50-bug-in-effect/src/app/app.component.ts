import {
  ChangeDetectionStrategy,
  Component,
  effect,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
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
     ** The bug occurs because of the short-circuit typescript's evalutation.
     ** When drive checkbox is clicked the effect is called and only the first part
     ** of the if statement is executed (this.drive()) and because this.drive() yields true,
     ** the other 2 statements are not evaluated.
     ** Because the nature of the effect is to be called when an already read signal(in this case drive singal)
     ** is changed, it is executed only when this.drive() is unchecked.
     ** In addition, if ram signal is checked initially and because it the second part of if condition,
     ** when ONLY either drive or ram signals are checked/unchecked the effect will be executed.
     */
    /*effect(() => {
      if (this.drive() || this.ram() || this.gpu()) {
        alert('Price increased!');
      }
    });*/

    effect(() => {
      if (this.drive()) {
        this.displayAlert();
      }
    });

    effect(() => {
      if (this.ram()) {
        this.displayAlert();
      }
    });

    effect(() => {
      if (this.gpu()) {
        this.displayAlert();
      }
    });
  }

  private displayAlert() {
    alert('Price increased!');
  }
}
