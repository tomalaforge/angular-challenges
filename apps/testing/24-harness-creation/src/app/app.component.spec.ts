import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { MySliderHarness } from './slider.harness';

describe('AppComponent', () => {
  async function setup() {
    const { fixture } = await render(AppComponent);
    return TestbedHarnessEnvironment.loader(fixture);
  }

  describe('When clicking 2 times on plus button of first slider', () => {
    test('Then value is 16', async () => {
      const loader = await setup();

      const slider = await loader.getHarness(
        MySliderHarness.with({ minValue: 10 }),
      );
      await slider.clickPlus();
      await slider.clickPlus();

      expect(await slider.getValue()).toBe(16);
    });
  });

  describe('When clicking 1 time on plus button and two times on minus button of first slider', () => {
    test('Then value is still 10', async () => {
      const loader = await setup();

      const slider = await loader.getHarness(
        MySliderHarness.with({ minValue: 10 }),
      );
      await slider.clickPlus();
      await slider.clickMinus();
      await slider.clickMinus();

      expect(await slider.getValue()).toBe(10);
    });
  });

  describe('When clicking 4 times on plus button of slider 1', () => {
    test('Then slider 2 is enabled', async () => {
      const loader = await setup();

      const firstSlider = await loader.getHarness(
        MySliderHarness.with({ minValue: 10 }),
      );
      const secondSlider = await loader.getHarness(
        MySliderHarness.with({ minValue: 0 }),
      );
      expect(await secondSlider.disabled()).toBe(true);
      await firstSlider.clickPlus();
      await firstSlider.clickPlus();
      await firstSlider.clickPlus();
      await firstSlider.clickPlus();

      expect(await secondSlider.disabled()).toBe(false);
    });
  });
});
