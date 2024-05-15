import {
  BaseHarnessFilters,
  ComponentHarness,
  ComponentHarnessConstructor,
  HarnessPredicate,
} from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';

export class MySliderHarness extends ComponentHarness {
  static hostSelector = 'app-slider';

  static with<T extends MySliderHarness>(
    this: ComponentHarnessConstructor<T>,
    options: BaseHarnessFilters & { minValue?: number } = {},
  ): HarnessPredicate<T> {
    return new HarnessPredicate(this, options).addOption(
      'minValue',
      options.minValue,
      async (harness, minValue) => {
        const value = await harness.getMinValue();
        return value === minValue;
      },
    );
  }

  async clickPlus(): Promise<void> {
    const plusButton = this.locatorFor(
      MatButtonHarness.with({ text: 'arrow_forward_ios' }),
    );
    return (await plusButton()).click();
  }

  async clickMinus(): Promise<void> {
    const minusButton = this.locatorFor(
      MatButtonHarness.with({ text: 'arrow_back_ios' }),
    );
    return (await minusButton()).click();
  }

  async getValue(): Promise<number> {
    return (await this.getEndThumb()).getValue();
  }

  async getMinValue(): Promise<number> {
    return (await this.getEndThumb()).getMinValue();
  }

  async disabled(): Promise<boolean> {
    return (await this.getSlider()).isDisabled();
  }

  async setValue(value: number): Promise<void> {
    return (await this.getEndThumb()).setValue(value);
  }

  private async getSlider() {
    return await this.locatorFor(MatSliderHarness)();
  }

  private async getEndThumb() {
    const slider = await this.getSlider();
    return await slider.getEndThumb();
  }
}
