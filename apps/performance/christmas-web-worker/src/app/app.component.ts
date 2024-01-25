import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { HeavyCalculationService } from './heavy-calculation.service';
import { UnknownPersonComponent } from './unknown-person/unknown-person.component';

@Component({
  standalone: true,
  imports: [CommonModule, UnknownPersonComponent],
  providers: [HeavyCalculationService],
  selector: 'app-root',
  template: `
    <unknown-person [step]="loadingPercentage()" class="relative grow" />

    @if (loadingPercentage() === 0) {
      <button
        class="my-3 w-fit self-center rounded-md border border-white px-4 py-2 text-2xl text-white"
        (click)="discover()">
        Discover
      </button>
    }

    <div class="p-1 text-white">Progress: {{ loadingPercentage() }}%</div>
  `,
  host: {
    class: `flex flex-col h-screen w-screen bg-[#1f75c0]`,
  },
})
export class AppComponent {
  private readonly heavyCalculationService = inject(HeavyCalculationService);

  private readonly webWorkerLoadingPercentage = signal(0);

  readonly loadingPercentage = computed(
    () =>
      this.heavyCalculationService.loadingPercentage() ||
      this.webWorkerLoadingPercentage(),
  );

  private worker: Worker | null = null;

  constructor() {
    this.initWebWorker();
  }

  discover() {
    if (!this.worker) {
      this.heavyCalculationService.startLoading();
    } else {
      this.worker.postMessage('startHeavyCalculation');
    }
  }

  startWorker() {
    this.worker?.postMessage('hello');
  }

  private initWebWorker() {
    if (typeof Worker === 'undefined') {
      return;
    }

    this.worker = new Worker(
      new URL('./christmas--web-worker.worker', import.meta.url),
    );

    this.worker.onmessage = ({ data }) => {
      this.webWorkerLoadingPercentage.set(data);
    };
  }
}
