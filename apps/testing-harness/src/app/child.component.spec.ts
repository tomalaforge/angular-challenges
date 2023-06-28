import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  test('should have 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
    await render(ChildComponent);
  });

  test('should get initial value of slider thumb', async () => {
    await render(ChildComponent);
  });

  test('set maxValue to 109 and slider max value should be 109', async () => {
    await render(ChildComponent);
  });

  test('toggle disabled checkbox and slider should be disabled', async () => {
    await render(ChildComponent);
  });

  test('set step value to 5 and click to forward button two times, thumb value should be 10', async () => {
    await render(ChildComponent);
  });

  test('slider value is 5, set step value to 6, click on back button, slider value should still be 5', async () => {
    await render(ChildComponent);
  });
});
