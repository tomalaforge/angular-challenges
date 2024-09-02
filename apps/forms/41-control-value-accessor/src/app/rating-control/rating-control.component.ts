import { Component, EventEmitter, forwardRef, Output } from '@angular/core';
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
export class RatingControlComponent implements ControlValueAccessor, Validator {
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (!control.value) {
      return { required: 'The value is required' };
    }
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {}

  private onChange!: (value: any) => void;
  private onTouched!: (value: any) => void;

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
  @Output()
  readonly ratingUpdated: EventEmitter<string> = new EventEmitter<string>();

  value: number | null = null;

  setRating(index: number): void {
    this.value = index + 1;
    this.ratingUpdated.emit(`${this.value}`);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
