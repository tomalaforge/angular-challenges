import { signal } from '@angular/core';

const loadingLength = signal(0);
const finalLength = 664579;

addEventListener('message', () => {
  console.log('her');
  for (let num = 2; num <= 10000000; num++) {
    let randomFlag = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        randomFlag = false;
        break;
      }
    }
    if (randomFlag) {
      loadingLength.update((l) => l + 1);
      postMessage(Math.round((loadingLength() * 100) / finalLength));
    }
  }
});
