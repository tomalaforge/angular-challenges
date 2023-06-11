import { render } from '@testing-library/angular';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  test('should have 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
    await render(SliderComponent);
  });
});
