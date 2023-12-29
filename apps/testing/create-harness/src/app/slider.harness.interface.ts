export interface ISliderHarness {
  clickPlus(): Promise<void>;

  clickMinus(): Promise<void>;

  getValue(): Promise<number>;

  getMinValue(): Promise<number>;

  disabled(): Promise<boolean>;

  setValue(value: number): Promise<void>;
}
