import { PersonPipe } from './person.pipe';

describe('PersonPipe', () => {
  it('create an instance', () => {
    const pipe = new PersonPipe();
    expect(pipe).toBeTruthy();
  });
  it('should transform', () => {
    const pipe = new PersonPipe();
    expect(pipe.transform('person', 10)).toBe(`person - 10`);
    expect(pipe.transform('', 10)).toBe(`? - 10`);
  });
});
