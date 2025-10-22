import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
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
  onChange: (value: number | null) => void = () => {};
  onTouched: () => void = () => {};

  value: number | null = null;

  writeValue(value: number | null): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setRating(index: number): void {
    this.value = index + 1;
    this.onChange(this.value);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
