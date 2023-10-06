import { render } from '@testing-library/angular';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent;
  let loader: HarnessLoader;
  beforeEach(async () => {
    const { fixture } = await render(ChildComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  describe('When init', () => {
    test('Then show 1 slider, 3 checkboxes, 4 inputs, 2 buttons', async () => {
      const [inputs, checkboxes, sliders, buttons] = await Promise.all([
        loader.getAllHarnesses(MatInputHarness),
        loader.getAllHarnesses(MatCheckboxHarness),
        loader.getAllHarnesses(MatSliderHarness),
        loader.getAllHarnesses(MatButtonHarness),
      ]);

      expect(inputs.length).toBe(4);
      expect(checkboxes.length).toBe(3);
      expect(sliders.length).toBe(1);
      expect(buttons.length).toBe(2);
    });

    test('Then initial value of slider thumb is 0', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const endThumb = await slider.getEndThumb();
      const value = await endThumb.getValue();
      expect(value).toBe(0);
    });
  });

  describe('Given maxValue set to 109', () => {
    test('Then slider max value is 109', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      component.max = 109;
      const maxValue = await slider.getMaxValue();
      expect(maxValue).toBe(109);
    });
  });

  describe('When disabled chebkbox is toggle', () => {
    test('Then slider is disabled', async () => {
      const [showTicksCheckbox, showThumbCheckbox, disabledCheckbox] =
        await loader.getAllHarnesses(MatCheckboxHarness);
      const slider = await loader.getHarness(MatSliderHarness);
      await disabledCheckbox.toggle();
      const isDisabled = await slider.isDisabled();
      expect(isDisabled).toBeTruthy();
    });
  });

  describe('Given step value set to 5, and When clicking on forward button two times', () => {
    test('Then thumb value is 10', async () => {
      const slider = await loader.getHarness(MatSliderHarness);
      const [backBtn, fwdBtn] = await loader.getAllHarnesses(MatButtonHarness);
      component.step = 5;
      await fwdBtn.click();
      await fwdBtn.click();
      const endThumb = await slider.getEndThumb();
      const thumbValue = await endThumb.getValue();
      expect(thumbValue).toBe(10);
    });
  });

  describe('Given slider value set to 5, and step value to 6 and When clicking on back button', () => {
    test('Then slider value is still 5', async () => {
      const [backBtn, fwdBtn] = await loader.getAllHarnesses(MatButtonHarness);
      component.value = 5;
      component.step = 6;
      await backBtn.click();
      expect(component.value).toBe(5);
    });
  });
});
