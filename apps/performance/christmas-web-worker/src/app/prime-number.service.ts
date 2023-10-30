import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class PrimeService {
  private finalResult = 664579;
  private primesLength = signal(0);

  loadingPercentage = computed(
    () => (this.primesLength() * 100) / this.finalResult
  );

  calculatePrimeLength() {
    this.findPrimesUpToLimit(10000000);
  }

  private findPrimesUpToLimit(limit: number) {
    for (let num = 2; num <= limit; num++) {
      let isPrime = true;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) {
        this.primesLength.update((l) => l + 1);
      }
    }
  }
}
