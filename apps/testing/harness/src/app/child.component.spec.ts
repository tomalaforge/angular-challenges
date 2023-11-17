import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChildComponent } from './child.component';
import { render } from '@testing-library/angular';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('ChildComponent', () => {
  async function setup() {
    const { fixture } = await render(ChildComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return loader;
  }
  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const loader = await setup();
      const sliders = await loader.getAllHarnesses(MatSliderHarness);
      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const buttons = await loader.getAllHarnesses(MatButtonHarness);

      expect(sliders.length).toBe(1);
      expect(checkboxes.length).toBe(3);
      expect(inputs.length).toBe(4);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const loader = await setup();
      const slider = await loader.getHarness(MatSliderHarness);
      const value = await (await slider.getEndThumb()).getValue();
      expect(value).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    let slider: MatSliderHarness;
    beforeAll(async () => {
      const loader = await setup();
      const inputMaxValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' })
      );
      slider = await loader.getHarness(MatSliderHarness);
      inputMaxValue.setValue('109');
    });
    test('Then slider max value is 109', async () => {
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
    let forwardBtn: MatButtonHarness;
    let slider: MatSliderHarness;
    beforeAll(async () => {
      const loader = await setup();
      const inputStepValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' })
      );
      inputStepValue.setValue('5');
      forwardBtn = (await loader.getAllHarnesses(MatButtonHarness))[1];
      slider = await loader.getHarness(MatSliderHarness);
    });
    test('Then thumb value is 10', async () => {
      await forwardBtn.click();
      await forwardBtn.click();
      const thumb = await slider.getEndThumb();
      expect(await thumb.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    let backwordBtn: MatButtonHarness;
    let slider: MatSliderHarness;
    beforeAll(async () => {
      const loader = await setup();
      const inputStepValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' })
      );
      inputStepValue.setValue('6');
      const inputValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-value' })
      );
      inputValue.setValue('5');
      backwordBtn = (await loader.getAllHarnesses(MatButtonHarness))[0];
      slider = await loader.getHarness(MatSliderHarness);
    });
    test('Then slider value is still 5', async () => {
      await backwordBtn.click();
      const thumb = await slider.getEndThumb();
      expect(await thumb.getValue()).toBe(5); // slider value is not -1 still 5
    });
  });
});
