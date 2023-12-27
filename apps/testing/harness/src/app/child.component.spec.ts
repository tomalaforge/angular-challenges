import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';
import { render } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  async function setup() {
    const { fixture } = await render(ChildComponent);
    return TestbedHarnessEnvironment.loader(fixture);
  }

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const loader = await setup();

      const slider = await loader.getAllHarnesses(MatSliderHarness);
      expect(slider.length).toBe(1);

      const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
      expect(checkboxes.length).toBe(3);

      const inputs = await loader.getAllHarnesses(MatInputHarness);
      expect(inputs.length).toBe(4);

      const buttons = await loader.getAllHarnesses(MatButtonHarness);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const loader = await setup();

      const sliderThumb = await loader.getHarness(MatSliderThumbHarness);
      const sliderThumbValue = await sliderThumb.getValue();
      expect(sliderThumbValue).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const loader = await setup();

      const slider = await loader.getHarness(MatSliderHarness);
      const inputMax = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );

      await inputMax.setValue(String(109));

      const sliderMaxValue = await slider.getMaxValue();
      expect(sliderMaxValue).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const loader = await setup();

      const slider = await loader.getHarness(MatSliderHarness);
      const checkboxDisabled = await loader.getHarness(
        MatCheckboxHarness.with({ label: 'Disabled' }),
      );

      await checkboxDisabled.check();

      const sliderDisabled = await slider.isDisabled();

      expect(sliderDisabled).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const loader = await setup();

      const sliderThumb = await loader.getHarness(MatSliderThumbHarness);
      const inputStep = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const buttonForward = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_forward_ios' }),
      );

      await inputStep.setValue(String(5));

      await buttonForward.click();
      await buttonForward.click();

      const sliderThumbValue = await sliderThumb.getValue();

      expect(sliderThumbValue).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const loader = await setup();

      const inputValue = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-value' }),
      );
      const inputStep = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const buttonBack = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_back_ios' }),
      );

      await inputValue.setValue(String(5));
      await inputStep.setValue(String(6));
      await buttonBack.click();

      const inputValueValue = await inputValue.getValue();

      expect(Number(inputValueValue)).toBe(5);
    });
  });
});
