import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';

import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildComponent],
      providers: [provideAnimations()],
    }).compileComponents();
    const fixture = TestBed.createComponent(ChildComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const [sliders, checkboxes, inputs, buttons] = await Promise.all([
        loader.getAllHarnesses(MatSliderHarness),
        loader.getAllHarnesses(MatCheckboxHarness),
        loader.getAllHarnesses(MatInputHarness),
        loader.getAllHarnesses(MatButtonHarness),
      ]);

      expect(sliders.length).toBe(1);
      expect(checkboxes.length).toBe(3);
      expect(inputs.length).toBe(4);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const thumb = await slider.getEndThumb();
      const sliderValue = await thumb.getValue();

      expect(sliderValue).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      // Given
      const [slider, inputMax] = await Promise.all([
        loader.getHarness(MatSliderHarness),
        loader.getHarness(MatInputHarness.with({ selector: '#input-max' })),
      ]);
      inputMax.setValue('109');

      // When
      const sliderMaxValue = await slider.getMaxValue();

      // Then
      expect(sliderMaxValue).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      // Given
      const [disabledCheckbox, slider] = await Promise.all([
        loader.getHarness(MatCheckboxHarness.with({ label: 'Disabled' })),
        loader.getHarness(MatSliderHarness),
      ]);

      // When
      await disabledCheckbox.toggle();

      // Then
      const sliderIsDisabled = await slider.isDisabled();
      expect(sliderIsDisabled).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      // Given
      const [inputStep, slider, forwardButton] = await Promise.all([
        loader.getHarness(MatInputHarness.with({ selector: '#input-step' })),
        loader.getHarness(MatSliderHarness),
        loader.getHarness(MatButtonHarness.with({ text: 'arrow_forward_ios' })),
      ]);
      await inputStep.setValue('5');

      // When
      forwardButton.click();
      forwardButton.click();

      // Then
      const thumb = await slider.getEndThumb();
      const sliderValue = await thumb.getValue();
      expect(sliderValue).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      // Given
      const [inputStep, slider, backButton] = await Promise.all([
        loader.getHarness(MatInputHarness.with({ selector: '#input-step' })),
        loader.getHarness(MatSliderHarness),
        loader.getHarness(MatButtonHarness.with({ text: 'arrow_back_ios' })),
      ]);
      const sliderThumb = await slider.getEndThumb();
      await sliderThumb.setValue(5);
      await inputStep.setValue('6');

      // When
      backButton.click();

      // Then
      const sliderValue = await sliderThumb.getValue();
      expect(sliderValue).toBe(5);
    });
  });
});
