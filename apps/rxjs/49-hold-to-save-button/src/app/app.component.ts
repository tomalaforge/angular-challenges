import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HoldableDirective } from './directives/holdable.directive';

@Component({
  standalone: true,
  imports: [HoldableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          [appHoldable]="MAX_TIME"
          (progressInHold)="elapsed.set($event)"
          (btnHoldableFinished)="onSend()"
          (mouseOut)="elapsed.set(0)"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="elapsed()" [max]="MAX_TIME"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  elapsed = signal(0);
  MAX_TIME = 1000;
  onSend() {
    this.elapsed.set(0);
    console.log('Save it!');
  }
}
