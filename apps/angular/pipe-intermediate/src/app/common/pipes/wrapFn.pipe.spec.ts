import { WrapFnPipe } from './wrapFn.pipe';

describe('WrapFnPipe', () => {
  it('create an instance', () => {
    const pipe = new WrapFnPipe();
    expect(pipe).toBeTruthy();
  });
});
