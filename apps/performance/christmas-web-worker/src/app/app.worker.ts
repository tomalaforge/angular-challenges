/// <reference lib="webworker" />

import { computed, signal } from '@angular/core';

addEventListener('message', () => {
  const finalLength = 664579;
  const loadingLength = signal(0);
  const loadingPercentage = computed(
    () => (loadingLength() * 100) / finalLength,
  );

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
      postMessage(loadingPercentage()); // best to read signal here ?
    }
  }
});

/*
- Struggled when I tried to recreate heavy-calculation.service as a class
- You cannot use a service inside a web worker.
- Then you have to add `static` to all methods 
- I was able to recreate the same functionality where progress stays stuck at 0 and only updates when it hits 100
- only the main thread wasn't blocked

- my approach was influenced by the article below 
- https://octoperf.com/blog/2023/02/10/angular-performance-web-worker/#extracting-the-prime-number-logic

*/
