import { render } from '@testing-library/angular';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  test('set input and listen to output', async () => {
    await render(CounterComponent);
  });
});
