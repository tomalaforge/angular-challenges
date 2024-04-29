import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true,
    },
  ],
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
})
export class RatingControlComponent implements ControlValueAccessor {
  private _onTouched = () => {};
  private _onChanged = (val: number | null) => {};

  value: number | null = null;
  writeValue(val: number | null) {
    this.value = val;
  }

  registerOnTouched(fn: () => void) {
    this._onTouched = fn;
  }

  registerOnChange(fn: (val: number | null) => void) {
    this._onChanged = fn;
  }

  setRating(index: number): void {
    const newVal = index + 1;
    this.value = newVal === this.value ? null : newVal;
    this._onTouched();
    this._onChanged(this.value);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
