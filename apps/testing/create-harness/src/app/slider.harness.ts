import {
  BaseHarnessFilters,
  ComponentHarness,
  HarnessPredicate,
} from '@angular/cdk/testing';
import { MatSliderHarness } from '@angular/material/slider/testing';
import { ISliderHarness } from './slider.harness.interface';

export class MySliderHarness
  extends ComponentHarness
  implements ISliderHarness
{
  static hostSelector = 'app-slider';
  private minusButton = this.locatorFor('button#minusButton');
  private plusButton = this.locatorFor('button#plusButton');
  private valueInput = this.locatorFor('input');
  private slider = this.locatorFor(MatSliderHarness);

  static with(options: BaseHarnessFilters): HarnessPredicate<MySliderHarness> {
    return new HarnessPredicate(MySliderHarness, options);
  }

  async disabled(): Promise<boolean> {
    return (await this.slider()).isDisabled();
  }

  async clickPlus(): Promise<void> {
    (await this.plusButton()).click();
  }

  async clickMinus(): Promise<void> {
    (await this.minusButton()).click();
  }

  async getValue(): Promise<number> {
    const valueAsString = (await this.valueInput()).getProperty('value');
    return parseInt(await valueAsString, 10);
  }

  async getMinValue(): Promise<number> {
    return (await this.slider()).getMinValue();
  }

  async setValue(value: number): Promise<void> {
    (await this.valueInput()).setInputValue(`${value}`);
  }
}
