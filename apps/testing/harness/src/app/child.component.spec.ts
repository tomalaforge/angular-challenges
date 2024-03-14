import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  async function getLoader() {
    const { fixture } = await render(ChildComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    return loader;
  }

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const loader = await getLoader();
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
      const loader = await getLoader();
      const slider = await loader.getHarness(MatSliderHarness);
      expect(await (await slider.getEndThumb()).getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const loader = await getLoader();
      const input = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );
      await input.setValue('109');
      const slider = await loader.getHarness(MatSliderHarness);
      expect(await slider.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const loader = await getLoader();
      const allCheckbox = await loader.getAllHarnesses(MatCheckboxHarness);
      const disabledCheckbox = allCheckbox[2];
      await disabledCheckbox.toggle();
      const slider = await loader.getHarness(MatSliderHarness);
      expect(await slider.isDisabled()).toBe(true);
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const loader = await getLoader();
      const input = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      await input.setValue('5');
      const slider = await loader.getHarness(MatSliderHarness);
      const thumbSlider = slider.getEndThumb();
      const allButtons = await loader.getAllHarnesses(MatButtonHarness);
      const rightButton = allButtons[1];
      rightButton.click();
      rightButton.click();
      expect(await (await thumbSlider).getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const loader = await getLoader();
      const input = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const slider = await loader.getHarness(MatSliderHarness);
      const thumbSlider = slider.getEndThumb();
      (await thumbSlider).setValue(5);
      await input.setValue('6');

      const allButtons = await loader.getAllHarnesses(MatButtonHarness);
      const leftButton = allButtons[0];
      leftButton.click();
      expect(await (await thumbSlider).getValue()).toBe(5);
    });
  });
});
