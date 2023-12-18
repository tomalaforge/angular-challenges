import { Component } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: RatingControlComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: RatingControlComponent,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor, Validator {
  rating: number | null = null;

  disabled = false;

  writeValue(rating: number): void {
    this.rating = rating;
    this.onChange(rating);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (rating: number) => {};
  registerOnChange(onChange: never) {
    this.onChange = onChange;
  }

  onTouched = () => {};
  registerOnTouched(onTouched: never) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  setRating(rating: number): void {
    this.writeValue(rating);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const rating = control.value;

    if (!rating) {
      return {
        required: true,
      };
    }

    return null;
  }
}
