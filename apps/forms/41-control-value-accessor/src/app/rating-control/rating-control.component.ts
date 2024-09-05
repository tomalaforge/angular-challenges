/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const RATING_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RatingControlComponent),
  multi: true,
};

export class RatingChange {
  source!: RatingControlComponent;
  rating!: number | null;
}

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  providers: [RATING_CONTROL_VALUE_ACCESSOR],
})
export class RatingControlComponent implements ControlValueAccessor {
  private controlValueAccessorChangeFn: (value: any) => void = () => {};
  private _disabled = false;
  change = output<RatingChange>();

  protected disableControl = false;

  constructor(
    protected changeDetectorRef: ChangeDetectorRef,
    protected changeDetector: ChangeDetectorRef,
  ) {}

  value: number | null = null;

  setRating(index: number): void {
    if (!this.disableControl) {
      this.value = index + 1;
      this.emitRatingEvent();
    }
  }

  onTouched: () => any = () => {};

  writeValue(rating: number): void {
    this.value = rating;
  }
  registerOnChange(fn: any): void {
    this.controlValueAccessorChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disableControl = isDisabled;
  }

  private emitRatingEvent(): void {
    const event = new RatingChange();
    event.source = this;
    event.rating = this.value;

    this.controlValueAccessorChangeFn(this.value);
    this.change.emit(event);
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }
}
