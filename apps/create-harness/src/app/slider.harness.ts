import {
  AsyncFactoryFn,
  BaseHarnessFilters,
  ComponentHarness,
  ComponentHarnessConstructor,
  HarnessPredicate,
} from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';

export interface SliderHarnessFilters extends BaseHarnessFilters {
  minValue?: number;
}

export class MySliderHarness extends ComponentHarness {
  static hostSelector = 'app-slider';

  static with<T extends MySliderHarness>(
    this: ComponentHarnessConstructor<T>,
    options: SliderHarnessFilters = {}
  ): HarnessPredicate<T> {
    return new HarnessPredicate(this, options).addOption(
      'minValue',
      options.minValue,
      async (harness, value) => {
        return (await harness.getMinValue()) === value;
      }
    );
  }

  protected getPlusButton: AsyncFactoryFn<MatButtonHarness> = this.locatorFor(
    MatButtonHarness.with({ selector: '#plusButton' })
  );

  protected getMinusButton: AsyncFactoryFn<MatButtonHarness> = this.locatorFor(
    MatButtonHarness.with({ selector: '#minusButton' })
  );

  protected getSlider: AsyncFactoryFn<MatSliderHarness> =
    this.locatorFor(MatSliderHarness);

  protected async getThumb() {
    return (await this.getSlider()).getEndThumb();
  }

  async clickPlus(): Promise<void> {
    return (await this.getPlusButton()).click();
  }

  async clickMinus(): Promise<void> {
    return (await this.getMinusButton()).click();
  }

  async getValue(): Promise<number> {
    const thumb = await this.getThumb();
    return thumb.getValue();
  }

  async getMinValue(): Promise<number> {
    const thumb = await this.getThumb();
    return thumb.getMinValue();
  }

  async disabled(): Promise<boolean> {
    return (await this.getSlider()).isDisabled();
  }

  async setValue(value: number): Promise<void> {
    const thumb = await this.getThumb();
    thumb.setValue(value);
  }
}
