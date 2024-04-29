import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HoldableDirective } from './holdable.directive';

@Component({
  standalone: true,
  imports: [HoldableDirective],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          [appHoldable]="HOLD_TIME"
          (appHoldableTime)="progress.set($event)"
          (appHoldableCompleted)="onSend()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>
        <progress [value]="progress()" [max]="HOLD_TIME"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  progress = signal(0);

  readonly HOLD_TIME = 800;

  onSend() {
    console.log('Save it!');
  }
}
