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
  protected value: number | null = null;
  protected isDisabled = false;
  private onChange!: (_: number) => void;
  private onTouch!: () => void;

  setRating(index: number): void {
    this.value = index + 1;
    this.onChange(this.value);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
