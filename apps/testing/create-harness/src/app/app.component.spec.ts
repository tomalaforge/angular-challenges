import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { SliderComponent } from './slider.component';
import { MySliderHarness } from './slider.harness';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let loader!: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SliderComponent, AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });
  describe('When clicking 2 times on plus button of first slider', () => {
    test('Then value is 16', async () => {
      const slider = await loader.getAllHarnesses(MySliderHarness);

      await Promise.all([slider[0].clickPlus(), slider[0].clickPlus()]);

      expect(await slider[0].getValue()).toBe(16);
    });
  });

  describe('When clicking 1 time on plus button and two times on minus button of first slider', () => {
    test('Then value is still 10', async () => {
      const slider = await loader.getAllHarnesses(MySliderHarness);
      const slider1 = slider[0];

      await slider1.clickPlus();
      await Promise.all([slider1.clickMinus(), slider1.clickMinus()]);

      expect(await slider1.getValue()).toBe(10);
    });
  });

  describe('When clicking 4 times on plus button of slider 1', () => {
    test('Then slider 2 is enabled', async () => {
      const sliders = await loader.getAllHarnesses(MySliderHarness);
      const slider1 = sliders[0];
      const slider2 = sliders[1];

      expect(await slider2.disabled()).toBe(true);

      await Promise.all([
        slider1.clickPlus(),
        slider1.clickPlus(),
        slider1.clickPlus(),
        slider1.clickPlus(),
      ]);

      expect(await slider2.disabled()).toBe(false);
    });
  });
});
