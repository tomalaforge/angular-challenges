import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  test('select first slider and value must be 16 after clicking twice on plus button', async () => {
    await render(AppComponent);
  });

  test('select first slider and click 1 time on plus button and twice on minus button, slider must be 10 again', async () => {
    await render(AppComponent);
  });
  test('second slider is disabled, click 4 times on first slider and slider 2 must be enabled', async () => {
    await render(AppComponent);
  });
});
