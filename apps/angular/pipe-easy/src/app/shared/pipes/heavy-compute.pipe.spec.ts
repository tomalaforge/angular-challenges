import { HeavyComputePipe } from './heavy-compute.pipe';

describe('HeavyComputePipe', () => {
  it('create an instance', () => {
    const pipe = new HeavyComputePipe();
    expect(pipe).toBeTruthy();
  });
});
