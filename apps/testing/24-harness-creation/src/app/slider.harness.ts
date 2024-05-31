import {
  AsyncFactoryFn,
  BaseHarnessFilters,
  ComponentHarness,
  ComponentHarnessConstructor,
  HarnessPredicate,
} from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import {
  MatSliderHarness,
  MatSliderThumbHarness,
} from '@angular/material/slider/testing';

interface SliderHarness {
  //provide number of times button is clicked
  clickPlus(times?: number): Promise<void>;
  //provide number of times button is clicked
  clickMinus(times?: number): Promise<void>;
  getValue(): Promise<number>;
  getMinValue(): Promise<number>;
  disabled(): Promise<boolean>;
  setValue(value: number): Promise<void>;
}

interface SliderHarnessFilters extends BaseHarnessFilters {
  minValue?: number;
}

export class MySliderHarness extends ComponentHarness implements SliderHarness {
  static hostSelector = 'app-slider';

  protected plusButton: AsyncFactoryFn<MatButtonHarness> = this.locatorFor(
    MatButtonHarness.with({ selector: '#plusButton' }),
  );
  protected minusButton: AsyncFactoryFn<MatButtonHarness> = this.locatorFor(
    MatButtonHarness.with({ selector: '#minusButton' }),
  );

  protected sliderThumb: AsyncFactoryFn<MatSliderThumbHarness> =
    this.locatorFor(MatSliderThumbHarness.with({ selector: '#sliderThumb' }));

  protected slider: AsyncFactoryFn<MatSliderHarness> = this.locatorFor(
    MatSliderHarness.with({ selector: '#slider' }),
  );

  static with<T extends MySliderHarness>(
    this: ComponentHarnessConstructor<T>,
    options: SliderHarnessFilters = {},
  ): HarnessPredicate<T> {
    return new HarnessPredicate(this, options).addOption(
      'minValue',
      options.minValue,
      async (harness, value) => {
        return (await harness.getMinValue()) === value;
      },
    );
  }

  async clickPlus(times = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      (await this.plusButton()).click();
    }
  }

  async clickMinus(times = 1): Promise<void> {
    for (let i = 0; i < times; i++) {
      (await this.minusButton()).click();
    }
  }

  async getValue(): Promise<number> {
    return (await this.sliderThumb()).getValue();
  }

  async getMinValue(): Promise<number> {
    return (await this.sliderThumb()).getMinValue();
  }

  async disabled(): Promise<boolean> {
    return (await this.slider()).isDisabled();
  }

  async setValue(value: number): Promise<void> {
    return (await this.sliderThumb()).setValue(value);
  }
}
