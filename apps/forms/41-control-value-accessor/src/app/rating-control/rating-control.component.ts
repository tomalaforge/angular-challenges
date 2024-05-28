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
      multi: true,
      useExisting: RatingControlComponent,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (rating: number) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = () => {};
  isDisabled = false;
  touched = false;
  value: number | null = 0;

  setRating(index: number): void {
    this.markAsTouched();
    this.value = index + 1;
    this.onChange(this.value);
  }

  isStarActive(index: number, rating: number | null): boolean {
    return rating ? index < rating : false;
  }

  writeValue(rating: any): void {
    this.value = rating;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
