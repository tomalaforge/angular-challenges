import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ChildComponent } from './child.component';

fdescribe('ChildComponent', () => {
  let fixture: ComponentFixture<ChildComponent>;
  let loader!: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildComponent],
      providers: [provideAnimations()],
    }).compileComponents();
    fixture = TestBed.createComponent(ChildComponent);
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

      expect(await thumb.getValue()).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const [slider, inputMaxValue] = await Promise.all([
        loader.getHarness(MatSliderHarness),
        loader.getHarness(MatInputHarness.with({ selector: '#input-max' })),
      ]);

      inputMaxValue.setValue('109');
      expect(await slider.getMaxValue()).toBe(109);
    });
  });

  describe('When disabled checkbox is toggled', () => {
    test('Then slider is disabled', async () => {
      const [disabledCheckbox, slider] = await Promise.all([
        loader.getHarness(MatCheckboxHarness.with({ label: 'Disabled' })),
        loader.getHarness(MatSliderHarness),
      ]);

      await disabledCheckbox.toggle();

      expect(await slider.isDisabled()).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    fit('Then thumb value is 10', async () => {
      const [inputStepValue, slider, buttonPlus] = await Promise.all([
        loader.getHarness(MatInputHarness.with({ selector: '#input-step' })),
        loader.getHarness(MatSliderHarness),
        loader.getHarness(MatButtonHarness.with({ text: 'arrow_forward_ios' })),
      ]);

      await inputStepValue.setValue('5');
      const thumb = await slider.getEndThumb();

      buttonPlus.click();
      buttonPlus.click();

      expect(await thumb.getValue()).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const [inputStepValue, slider, buttonBack] = await Promise.all([
        loader.getHarness(MatInputHarness.with({ selector: '#input-step' })),
        loader.getHarness(MatSliderHarness),
        loader.getHarness(MatButtonHarness.with({ text: 'arrow_back_ios' })),
      ]);

      await inputStepValue.setValue('10');
      const thumb = await slider.getEndThumb();

      thumb.setValue(5);
      buttonBack.click();

      expect(await thumb.getValue()).toBe(5);
    });
  });
});
