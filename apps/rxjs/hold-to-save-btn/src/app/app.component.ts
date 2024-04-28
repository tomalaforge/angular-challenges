import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  DEFAULT_HOLD_TIME_TOKEN,
  HoldableDirective,
} from './holdable.directive';

@Component({
  standalone: true,
  imports: [HoldableDirective],
  providers: [
    {
      provide: DEFAULT_HOLD_TIME_TOKEN,
      useValue: 3000,
    },
  ],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <button
          appHoldable
          #holdable="holdable"
          (active)="onSend()"
          class="rounded bg-indigo-600 px-4 py-2 font-bold text-white transition-colors ease-in-out hover:bg-indigo-700">
          Hold me
        </button>

        <progress [value]="holdable.progress()" [max]="100"></progress>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  onSend() {
    console.log('Save it!');
  }
}
