import { render } from '@testing-library/angular';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  describe('Given an initualValue of 10', () => {
    test('Then counterValue is 10', async () => {
      await render(CounterComponent);
    });

    describe('When clicking 5 times on increment button', () => {
      test('Then counterValue is 15', async () => {
        await render(CounterComponent);
      });
    });

    describe('When clicking 2 times on decrement button', () => {
      test('Then counterValue is 8', async () => {
        await render(CounterComponent);
      });
      describe('When clicking on Send ', () => {
        test('Then emitted value is 8', async () => {
          await render(CounterComponent);
        });
      });
    });
  });
});
