/// <reference lib="webworker" />

function calculatePrimes(maxNumber: number): void {
  let count = 0;
  const finalLength = 664579;

  for (let num = 2; num <= maxNumber; num++) {
    let isPrime = true;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      count++;
      postMessage((count * 100) / finalLength);
    }
  }
}

addEventListener('message', ({ data }) => {
  calculatePrimes(data);
});
