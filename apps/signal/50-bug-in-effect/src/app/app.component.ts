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

  // For some reason this was not working. When i check first checkbox, check second,
  // then uncheck first and check again alert was not shown, prev.drive, next.drive
  // were both true
  //   effect(() => {
  //     const { drive, ram, gpu } = componentsComputed();
  //     if (drive || ram || gpu) {
  //       alert('Price increased');
  //     }
  //   });

  //   const componentsComputed = computed(
  //     () => ({
  //       drive: this.drive(),
  //       ram: this.ram(),
  //       gpu: this.gpu(),
  //     }),
  //     {
  //       equal: (prev, next) => {
  //         if (
  //           (!Object.is(prev.drive, next.drive) && next.drive) ||
  //           (!Object.is(prev.ram, next.ram) && next.ram) ||
  //           (!Object.is(prev.gpu, next.gpu) && next.gpu)
  //         ) {
  //           return false;
  //         }
  //         return !(!next.drive && !next.ram && !next.gpu);
  //       },
  //     },
  //   );
  // }

  // Define computed values
  componentsComputed = computed(() => ({
    drive: this.drive(),
    ram: this.ram(),
    gpu: this.gpu(),
  }));

  // Subscribe to changes
  constructor() {
    let previousState = { drive: false, ram: false, gpu: false };

    effect(() => {
      const { drive, ram, gpu } = this.componentsComputed();

      // Check if any checkbox is newly selected (going from false to true)
      if (
        (!previousState.drive && drive) ||
        (!previousState.ram && ram) ||
        (!previousState.gpu && gpu)
      ) {
        alert('Price increased');
      }

      // Update previous state to the current state
      previousState = { drive, ram, gpu };
    });
  }
}
