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

  //First solution
  constructor() {
    effect(() => {
      if (this.drive()) {
        this.priceIncreasedAlert();
      }
    });
    effect(() => {
      if (this.ram()) {
        this.priceIncreasedAlert();
      }
    });
    effect(() => {
      if (this.gpu()) {
        this.priceIncreasedAlert();
      }
    });
  }

  priceIncreasedAlert() {
    alert('Price increased!');
  }

  //Second solution
  // prev = 0
  // sum = computed(() => {
  //   return +this.drive() + +this.ram() + +this.gpu();
  // });
  //
  // constructor() {
  //   effect(() => {
  //     if (this.prev < this.sum()) {
  //       this.priceIncreasedAlert();
  //     }
  //     this.prev = this.sum()
  //   });
  // }
}
