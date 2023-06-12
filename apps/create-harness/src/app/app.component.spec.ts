import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { MySliderHarness } from './slider.harness';

describe('AppComponent', () => {
  async function setup() {
    const { fixture } = await render(AppComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return loader;
  }

  describe('When clicking 2 times on plus button of first slider', () => {
    test('Then value is 16', async () => {
      const loader = await setup();
      const sliders = await loader.getAllHarnesses(MySliderHarness);
      const slider = sliders[0];

      await slider.clickPlus();
      await slider.clickPlus();
      expect(await slider.getValue()).toEqual(16);
    });
  });

  describe('When clicking 1 time on plus button and two times on minus button of first slider', () => {
    test('Then value is still 10', async () => {
      const loader = await setup();
      const sliders = await loader.getAllHarnesses(MySliderHarness);
      const slider = sliders[0];

      await slider.clickPlus();
      await slider.clickMinus();
      await slider.clickMinus();
      expect(await slider.getValue()).toEqual(10);
    });
  });

  describe('When clicking 4 times on plus button of slider 1', () => {
    test('Then slider 2 is enabled', async () => {
      const loader = await setup();
      const slider1 = await loader.getHarness(
        MySliderHarness.with({ minValue: 10 })
      );
      const slider2 = await loader.getHarness(
        MySliderHarness.with({ minValue: 0 })
      );

      expect(await slider2.disabled()).toBe(true);

      await slider1.clickPlus();
      await slider1.clickPlus();
      await slider1.clickPlus();
      await slider1.clickPlus();
      expect(await slider2.disabled()).toBe(false);
    });
  });
});
