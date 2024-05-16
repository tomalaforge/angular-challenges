import {ChangeDetectionStrategy, Component, computed, effect, model} from '@angular/core';
import {FormsModule} from '@angular/forms';


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
        <input type="checkbox" [(ngModel)]="drive"/>
        +500 GB drive-space
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="ram"/>
        +4 GB RAM
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="gpu"/>
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
    const componentsComputed = computed(() => ({
      drive: this.drive(),
      ram: this.ram(),
      gpu: this.gpu(),
    }), {
      equal: (prev, next) => {
        if ((prev.drive !== next.drive && next.drive) ||
          (prev.ram !== next.ram && next.ram) ||
          (prev.gpu !== next.gpu && next.gpu)) {
          return false;
        }
        return !(!next.drive && !next.ram && !next.gpu);

      },
    });

    effect(() => {
      const {drive, ram, gpu} = componentsComputed();
      if (drive || ram || gpu) {
        alert('Price increased');
      }
    });
  }
}
