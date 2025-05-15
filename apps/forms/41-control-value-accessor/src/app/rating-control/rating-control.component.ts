import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor {
  protected isDisabled = false;

  protected value: number | null = null;

  private _onChange: (value: string) => void = noop;
  private _onTouch = noop;

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: typeof noop): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setRating(index: number): void {
    if (this.isDisabled) {
      return;
    }

    this.value = index + 1;
    this._onTouch();
    this._onChange(this.value.toString());
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
