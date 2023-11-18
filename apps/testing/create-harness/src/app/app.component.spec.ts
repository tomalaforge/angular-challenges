import { MySliderHarness } from './slider.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';
import { HarnessLoader } from '@angular/cdk/testing';
describe('AppComponent', () => {
  let slider: MySliderHarness;
  let slider2: MySliderHarness;
  let loader: HarnessLoader;
  beforeEach(async () => {
    const { fixture } = await render(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    slider = await loader.getHarness(MySliderHarness.with({ minValue: 10 }));
    slider2 = await loader.getHarness(MySliderHarness.with({ minValue: 0 }));
  });
  describe('When clicking 2 times on plus button of first slider', () => {
    beforeEach(async () => {
      await slider.clickPlus();
      await slider.clickPlus();
    });
    test('Then value is 16', async () => {
      expect(await slider.getValue()).toEqual(16);
    });
  });

  describe('When clicking 1 time on plus button and two times on minus button of first slider', () => {
    beforeEach(async () => {
      await slider.clickPlus();
      await slider.clickMinus();
      await slider.clickMinus();
    });
    test('Then value is still 10', async () => {
      expect(await slider.getValue()).toEqual(10);
    });
  });

  describe('When clicking 4 times on plus button of slider 1', () => {
    beforeEach(async () => {
      await slider.clickPlus();
      await slider.clickPlus();
      await slider.clickPlus();
      await slider.clickPlus();
    });
    test('Then slider 2 is enabled', async () => {
      expect(await slider2.disabled()).toBe(false);
    });
  });
});
