import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';
import { render, RenderResult, screen } from '@testing-library/angular';
import { ChildComponent } from './child.component';

describe.only('ChildComponent', () => {
  let view: RenderResult<ChildComponent, ChildComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    view = await render(ChildComponent);
    loader = TestbedHarnessEnvironment.documentRootLoader(view.fixture);
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      expect(screen.getByTestId('mat-slider')).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox').length).toBe(3);
      expect(screen.getAllByRole('button').length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const sliderThumbHarness = await loader.getHarness(MatSliderThumbHarness);

      expect(await sliderThumbHarness.getValue()).toBe(0);
      expect(await sliderThumbHarness.getDisplayValue()).toBe('0');
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const maxValueInput = loader.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );

      (await maxValueInput).setValue('109');

      expect(await sliderHarness.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const sliderHarness = await loader.getHarness(MatSliderHarness);
      const disabledCheckbox = await loader.getHarness(
        MatCheckboxHarness.with({
          selector: '[data-testid="disable-checkbox"]',
        }),
      );

      await disabledCheckbox.check();

      expect(await sliderHarness.isDisabled()).toBe(true);
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const sliderThumbHarness = await loader.getHarness(MatSliderThumbHarness);
      const stepInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const forwardButton = await loader.getHarness(
        MatButtonHarness.with({
          selector: 'button[data-testid="arrow-forward-btn"]',
        }),
      );

      await stepInput.setValue('5');
      await forwardButton.click();
      await forwardButton.click();

      expect(await sliderThumbHarness.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const sliderThumbHarness = await loader.getHarness(MatSliderThumbHarness);
      const stepInput = await loader.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const backButton = await loader.getHarness(
        MatButtonHarness.with({
          selector: 'button[data-testid="arrow-back-btn"]',
        }),
      );

      await sliderThumbHarness.setValue(5);
      await stepInput.setValue('6');
      await backButton.click();

      expect(await sliderThumbHarness.getValue()).toBe(5);
    });
  });
});
