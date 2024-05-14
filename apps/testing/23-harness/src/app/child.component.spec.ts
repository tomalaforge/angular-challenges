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
    return TestbedHarnessEnvironment.loader(fixture);
  }

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      // Arrange
      const loader = await setup();

      // Act
      // Assert
      expect(await loader.getAllHarnesses(MatSliderHarness)).toHaveLength(1);
      expect(await loader.getAllHarnesses(MatCheckboxHarness)).toHaveLength(3);
      expect(await loader.getAllHarnesses(MatInputHarness)).toHaveLength(4);
      expect(await loader.getAllHarnesses(MatButtonHarness)).toHaveLength(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      // Arrange
      const loader = await setup();
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const endThumb = await sliderHarness.getEndThumb();

      // Act
      // Assert
      expect(await endThumb.getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      // Arrange
      const loader = await setup();
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const maxInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );

      // Act
      await maxInput.setValue('109');

      // Assert
      expect(await sliderHarness.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      // Arrange
      const loader = await setup();
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const disabledCheckBox = await loader.getHarness(
        MatCheckboxHarness.with({ label: 'Disabled' }),
      );

      // Act
      await disabledCheckBox.check();

      // Assert
      expect(await sliderHarness.isDisabled()).toBe(true);
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      // Arrange
      const loader = await setup();
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const stepSizeInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const forwardButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_forward_ios' }),
      );
      const endThumb = await sliderHarness.getEndThumb();

      // Act
      await stepSizeInput.setValue('5');
      await forwardButton.click();
      await forwardButton.click();

      // Assert
      expect(await endThumb.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      // Arrange
      const loader = await setup();
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const valueInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-value' }),
      );
      const stepSizeInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const backButton = await loader.getHarness(
        MatButtonHarness.with({ text: 'arrow_back_ios' }),
      );
      const endThumb = await sliderHarness.getEndThumb();

      // Act
      await valueInput.setValue('5');
      await stepSizeInput.setValue('6');
      await backButton.click();

      // Assert
      expect(await endThumb.getValue()).toBe(5);
    });
  });
});
