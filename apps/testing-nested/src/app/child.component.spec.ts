import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  test('add Good title and send request title with no error', async () => {
    await render(ChildComponent);
  });

  test('fail validating title because no title were typed', async () => {
    await render(ChildComponent);
  });
});
