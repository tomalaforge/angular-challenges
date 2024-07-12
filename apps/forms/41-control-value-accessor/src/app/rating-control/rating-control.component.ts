import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';

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
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor {
  value: number | null = null;

  onChange!: (value: number | null) => void;
  onTouched!: () => void;
  isDisabled = false;

  writeValue(value: number): void {
    this.setRating(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  setRating(index: number): void {
    if (typeof index !== 'number') {
      this.value = null;
    } else {
      this.value = index + 1;
    }
    this.onChange?.(this.value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.value !== null ? null : { ratting: true };
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
