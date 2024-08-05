import { Component, forwardRef} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-rating-control',
  templateUrl: 'rating-control.component.html',
  styleUrls: ['rating-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingControlComponent),
      multi: true
    }
  ]
})
export class RatingControlComponent {


  value: number | null = null;
  private onChange!: (value: number) => void;
  private onTouched!: () => void;

  public writeValue(value: number): void {
    this.value = value;
  }

  public registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setRating(index: number): void {
    this.value = index + 1;
    this.onChange(this.value)
  }

  isStarActive(index: number, value: number | null): boolean {
    return value ? index < value : false;
  }

  public onBlur(): void {
    this.onTouched();
  }
}
