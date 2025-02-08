import { Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingControlComponent,
      multi: true,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor {
  value: number | null = null;
  disabled = false;
  onChange: (value: string | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setRating(index: number): void {
    if (this.disabled) return;

    this.value = index + 1;
    this.onChange(this.value?.toString() ?? null);
    this.onTouched();
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
