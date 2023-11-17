import { FibonacciPipe } from './fibonacci.pipe';

describe('FibonacciPipe', () => {
  it('create an instance', () => {
    const pipe = new FibonacciPipe();
    expect(pipe).toBeTruthy();
  });
});
