import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HoldableDirective } from './holdable.directive';

@Component({
  standalone: true,
  imports: [HoldableDirective, CommonModule],
  selector: 'app-root',
  template: `
    <main class="flex h-screen items-center justify-center bg-gray-50">
      <div
        class="flex w-full max-w-screen-sm flex-col items-center gap-y-8 p-4">
        <div class="text-center">
          <h1 class="mb-2 text-2xl font-bold text-gray-800">Hold to Save</h1>
          <p class="text-gray-600">Hold the button for 5 seconds to save</p>
        </div>

        <button
          holdable
          [holdDuration]="5000"
          (holdProgress)="progress.set($event)"
          (holdComplete)="onSave()"
          [class]="buttonClasses()"
          [disabled]="saving()">
          <span class="flex items-center gap-2">
            <span *ngIf="!saving()">
              {{ progress() > 0 ? 'Hold...' : 'Hold me' }}
            </span>
            <span *ngIf="saving()">Saving...</span>
          </span>
        </button>

        <div class="w-full max-w-xs">
          <progress
            [value]="progress()"
            max="100"
            class="transition-all duration-100"></progress>
          <p class="mt-2 text-center text-sm text-gray-600">
            {{ progress().toFixed(0) }}% Complete
          </p>
        </div>
      </div>
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  progress = signal(0);
  saving = signal(false);

  buttonClasses = () => {
    const base =
      'rounded px-6 py-3 font-semibold text-white transition-all duration-200 transform';
    const state = this.saving()
      ? 'bg-green-500 cursor-not-allowed opacity-75'
      : this.progress() > 0
        ? 'bg-indigo-700 scale-95'
        : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95';

    return `${base} ${state}`;
  };

  onSave() {
    this.saving.set(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Saved successfully!');
      this.saving.set(false);
      this.progress.set(0);
    }, 1000);
  }
}
