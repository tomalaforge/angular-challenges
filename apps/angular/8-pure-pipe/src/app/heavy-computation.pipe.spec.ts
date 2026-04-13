import { HeavyComputationPipe } from './heavy-computation.pipe';

describe('HeavyComputationPipe', () => {
  let pipe: HeavyComputationPipe;
  beforeEach(() => {
    pipe = new HeavyComputationPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return formatted name with index', () => {
    expect(pipe.transform('toto', 0)).toBe('toto - 0');
    expect(pipe.transform('jack', 1)).toBe('jack - 1');
  });

  it('should return the original value when value is not a string', () => {
    expect(pipe.transform(123, 0)).toBe(123);
  });
});
