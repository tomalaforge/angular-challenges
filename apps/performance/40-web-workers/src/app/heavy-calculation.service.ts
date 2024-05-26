import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class HeavyCalculationService {
  private finalLength = 664579;
  private loadingLength = signal(0);
  private worker!: Worker;

  constructor() {
    this.worker = new Worker(
      new URL('./heavy-calculation.worker', import.meta.url),
    );
    this.worker.onmessage = () => {
      this.loadingLength.update((l) => l + 1);
    };
  }

  loadingPercentage = computed(
    () => (this.loadingLength() * 100) / this.finalLength,
  );

  isLoading = computed(
    () => this.loadingPercentage() > 0 && this.loadingPercentage() < 100,
  );

  startLoading() {
    this.worker.postMessage(this.loadingLength());
  }
}
