import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class HeavyCalculationService {
  private worker: Worker;
  private loadingLength = signal(0);

  loadingPercentage = computed(() =>
    Math.min(Math.round(this.loadingLength()), 100),
  );

  constructor() {
    this.worker = new Worker(
      new URL('./heavy-calculation.worker', import.meta.url),
    );
    this.worker.onmessage = ({ data }) => {
      this.loadingLength.set(data);
    };
  }

  startLoading() {
    this.loadingLength.set(0);
    this.worker.postMessage(10000000);
  }

  ngOnDestroy() {
    this.worker.terminate();
  }
}
