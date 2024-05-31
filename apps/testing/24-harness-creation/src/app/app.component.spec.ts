import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { MySliderHarness } from './slider.harness';

async function setup() {
  const { fixture } = await render(AppComponent);

  const loader = TestbedHarnessEnvironment.loader(fixture);
  const defaultSlider = await loader.getHarness(
    MySliderHarness.with({ selector: '#default-slider' }),
  );

  return { loader, defaultSlider };
}

describe('AppComponent', () => {
  describe('When clicking 2 times on plus button of first slider', () => {
    test('Then value is 16', async () => {
      const { defaultSlider } = await setup();

      await defaultSlider.clickPlus(2);

      expect(await defaultSlider.getValue()).toBe(16);
    });
  });

  describe('When clicking 1 time on plus button and two times on minus button of first slider', () => {
    test('Then value is still 10', async () => {
      const { defaultSlider } = await setup();

      await defaultSlider.clickPlus(1);
      await defaultSlider.clickMinus(2);

      expect(await defaultSlider.getValue()).toBe(10);
    });
  });

  describe('When clicking 3 times on plus button of slider 1', () => {
    test('Then slider 2 should remain disabled', async () => {
      const { loader, defaultSlider } = await setup();

      const secondSlider = await loader.getHarness(
        MySliderHarness.with({ minValue: 0 }),
      );

      expect(await defaultSlider.disabled()).toBeFalsy();
      expect(await secondSlider.disabled()).toBeTruthy();

      await defaultSlider.clickPlus(3);

      expect(await defaultSlider.disabled()).toBeFalsy();
      expect(await secondSlider.disabled()).toBeTruthy();
    });
  });

  describe('When clicking 4 times on plus button of slider 1', () => {
    test('Then slider 2 is enabled', async () => {
      const { loader, defaultSlider } = await setup();

      const secondSlider = await loader.getHarness(
        MySliderHarness.with({ minValue: 0 }),
      );

      expect(await defaultSlider.disabled()).toBeFalsy();
      expect(await secondSlider.disabled()).toBeTruthy();

      await defaultSlider.clickPlus(4);

      expect(await defaultSlider.disabled()).toBeFalsy();
      expect(await secondSlider.disabled()).toBeFalsy();
    });
  });
});
