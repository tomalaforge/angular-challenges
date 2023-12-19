import { Component,EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
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
      useExisting: RatingControlComponent,
      multi: true,
    },
  ],
})
export class RatingControlComponent implements ControlValueAccessor, Validator {
  value: number | null = null;
  onChange?: (value: number) => void;
  onTouched?: () => void;
  disabled!: boolean;
  writeValue(value: number): void {
    this.value = value;
    this.onChange?.(this.value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setRating(index: number): void {
    this.writeValue(index + 1);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return control.value ? { required: true } : null;
  }
}
