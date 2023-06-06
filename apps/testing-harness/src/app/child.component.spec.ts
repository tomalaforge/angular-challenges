import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  async function setup() {
    const { fixture } = await render(ChildComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return loader;
  }

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const loader = await setup();
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      const sliders = await loader.getAllHarnesses(MatSliderHarness);
      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(inputs.length).toBe(4);
      expect(checkboxes.length).toBe(3);
      expect(sliders.length).toBe(1);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const loader = await setup();
      const slider = await loader.getHarness(MatSliderHarness);
      const thumb = await slider.getEndThumb();
      expect(await thumb.getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const loader = await setup();
      const inputMaxValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' })
      );
      const slider = await loader.getHarness(MatSliderHarness);
      inputMaxValue.setValue('109');
      expect(await slider.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled chebkbox is toggle', () => {
    test('Then slider is disabled', async () => {
      const loader = await setup();
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      const slider = await loader.getHarness(MatSliderHarness);
      await checkboxes[2].toggle();
      expect(await slider.isDisabled()).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const loader = await setup();
      const inputStepValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' })
      );
      const slider = await loader.getHarness(MatSliderHarness);
      await inputStepValue.setValue('5');
      const thumb = await slider.getEndThumb();

      const buttonPlus = (await loader.getAllHarnesses(MatButtonHarness))[1];
      buttonPlus.click();
      buttonPlus.click();

      expect(await thumb.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const loader = await setup();
      const inputStepValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' })
      );
      const slider = await loader.getHarness(MatSliderHarness);
      await inputStepValue.setValue('10');
      const thumb = await slider.getEndThumb();
      thumb.setValue(5);

      const buttonBack = (await loader.getAllHarnesses(MatButtonHarness))[0];
      buttonBack.click();

      expect(await thumb.getValue()).toBe(5);
    });
  });
});
