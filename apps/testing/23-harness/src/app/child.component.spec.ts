import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let fixture: ComponentFixture<ChildComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ChildComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const sliderCard = await loader.getChildLoader('#slider-card');

      const checkboxes =
        await sliderConfigurationCard.getAllHarnesses(MatCheckboxHarness);
      const inputs =
        await sliderConfigurationCard.getAllHarnesses(MatInputHarness);
      const buttons = await sliderCard.getAllHarnesses(MatButtonHarness);
      const slider = await sliderCard.getHarness(MatSliderHarness);

      expect(checkboxes.length).toBe(3);
      expect(inputs.length).toBe(4);
      expect(buttons.length).toBe(2);
      expect(slider).toBeTruthy();
    });

    test('Then initial value of slider thumb is 0', async () => {
      const sliderCard = await loader.getChildLoader('#slider-card');
      const sliderThumb = await sliderCard.getHarness(MatSliderThumbHarness);

      expect(sliderThumb).toBeTruthy();

      const initialThumbValue = await sliderThumb.getValue();

      expect(initialThumbValue).toEqual(0);
    });
  });

  describe('Slider state', () => {
    test('The default max value is 100', async () => {
      const sliderCard = await loader.getChildLoader('#slider-card');

      const slider = await sliderCard.getHarness(MatSliderHarness);

      const sliderMaxValue = await slider.getMaxValue();

      expect(sliderMaxValue).toBe(100);
    });

    test('When input max value is 109, then slider max value is 109', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const maxInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );
      await maxInput.setValue('109');

      const sliderCard = await loader.getChildLoader('#slider-card');
      const slider = await sliderCard.getHarness(MatSliderHarness);

      const sliderMaxValue = await slider.getMaxValue();

      expect(sliderMaxValue).toBe(109);
    });

    test('The default min value is 0', async () => {
      const sliderCard = await loader.getChildLoader('#slider-card');

      const slider = await sliderCard.getHarness(MatSliderHarness);

      const sliderMinValue = await slider.getMinValue();

      expect(sliderMinValue).toBe(0);
    });

    test('When input min value is -5, then slider min value is -5', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const minInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-min' }),
      );
      await minInput.setValue('-5');

      const sliderCard = await loader.getChildLoader('#slider-card');
      const slider = await sliderCard.getHarness(MatSliderHarness);

      const sliderMinValue = await slider.getMinValue();

      expect(sliderMinValue).toBe(-5);
    });

    test('When "disabled" checkbox is checked, then slider is disabled', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const disabledCheckbox = await sliderConfigurationCard.getHarness(
        MatCheckboxHarness.with({ selector: '#disabled-checkbox' }),
      );
      const sliderCard = await loader.getChildLoader('#slider-card');
      const slider = await sliderCard.getHarness(MatSliderHarness);

      await disabledCheckbox.check();

      expect(await slider.isDisabled()).toBeTruthy();
    });
  });

  describe('Slider configuration checkboxes state', () => {
    test('When "disabled" checkbox is not checked and it is clicked, then its state is checked', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const disabledCheckbox = await sliderConfigurationCard.getHarness(
        MatCheckboxHarness.with({ selector: '#disabled-checkbox' }),
      );
      await disabledCheckbox.check();

      expect(await disabledCheckbox.isChecked()).toBeTruthy();
    });

    test('When "disabled" checkbox is checked and it is clicked, then its state is not checked', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const disabledCheckbox = await sliderConfigurationCard.getHarness(
        MatCheckboxHarness.with({ selector: '#disabled-checkbox' }),
      );
      await disabledCheckbox.uncheck();

      expect(await disabledCheckbox.isChecked()).toBeFalsy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const stepInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const sliderCard = await loader.getChildLoader('#slider-card');

      await stepInput.setValue('5');

      const sliderThumb = await sliderCard.getHarness(MatSliderThumbHarness);
      const forwardButton = await sliderCard.getHarness(
        MatButtonHarness.with({ selector: '#forward-button' }),
      );

      await forwardButton.click();
      await forwardButton.click();

      expect(await sliderThumb.getValue()).toBe(10);
    });

    test('Then input value is 10', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const stepInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const valueInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-value' }),
      );
      const sliderCard = await loader.getChildLoader('#slider-card');

      await stepInput.setValue('5');

      const forwardButton = await sliderCard.getHarness(
        MatButtonHarness.with({ selector: '#forward-button' }),
      );

      await forwardButton.click();
      await forwardButton.click();

      expect(await valueInput.getValue()).toBe('10');
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const stepInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const valueInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-value' }),
      );
      const sliderCard = await loader.getChildLoader('#slider-card');

      await valueInput.setValue('5');
      await stepInput.setValue('6');

      const sliderThumb = await sliderCard.getHarness(MatSliderThumbHarness);

      const backButton = await sliderCard.getHarness(
        MatButtonHarness.with({ selector: '#back-button' }),
      );

      await backButton.click();

      expect(await sliderThumb.getValue()).toBe(5);
    });
  });

  describe('Given slider min value set to -6, max value set to 105 and step value to 7', () => {
    test('Then slider min value is -6', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const stepInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const minInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-min' }),
      );
      const maxInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );
      const sliderCard = await loader.getChildLoader('#slider-card');

      await minInput.setValue('-6');
      await maxInput.setValue('105');
      await stepInput.setValue('7');

      const slider = await sliderCard.getHarness(MatSliderHarness);

      expect(await slider.getMinValue()).toBe(-6);
    });
  });

  describe('Given slider min value set to 1, max value set to 106 and step value to 7', () => {
    test('Then slider thumb value is 36 after clicking forward button 6 times', async () => {
      const sliderConfigurationCard = await loader.getChildLoader(
        '#slider-configuration-card',
      );
      const stepInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-step' }),
      );
      const minInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-min' }),
      );
      const maxInput = await sliderConfigurationCard.getHarness(
        MatInputHarness.with({ selector: '#input-max' }),
      );
      const sliderCard = await loader.getChildLoader('#slider-card');
      const sliderThumb = await sliderCard.getHarness(MatSliderThumbHarness);
      const forwardButton = await sliderCard.getHarness(
        MatButtonHarness.with({ selector: '#forward-button' }),
      );

      await minInput.setValue('1');

      expect(await minInput.getValue()).toBe('1');

      await forwardButton.click();

      await maxInput.setValue('106');
      await stepInput.setValue('7');

      await forwardButton.click();
      await forwardButton.click();
      await forwardButton.click();
      await forwardButton.click();
      await forwardButton.click();

      expect(await sliderThumb.getValue()).toBe(36);
    });
  });
});
