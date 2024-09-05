import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RatingControlComponent } from '../rating-control/rating-control.component';

@Component({
  standalone: true,
  imports: [RatingControlComponent, ReactiveFormsModule],
  selector: 'app-feedback-form',
  templateUrl: 'feedback-form.component.html',
  styleUrls: ['feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  @Output()
  readonly feedBackSubmit: EventEmitter<Record<string, string | null>> =
    new EventEmitter<Record<string, string | null>>();
  disableRatingComponent = true;
  readonly feedbackForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: Validators.required,
    }),
    comment: new FormControl(),
    rating: new FormControl({ value: '', disabled: true }),
  });

  onEnableRating(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.feedbackForm.controls.rating.enable();
      this.feedbackForm.controls.rating.setValidators(Validators.required);
    } else {
      this.feedbackForm.controls.rating.disable();
      this.disableRatingComponent = false;

      this.feedbackForm.controls.rating.clearValidators();
    }
    this.feedbackForm.controls.rating.updateValueAndValidity();
  }

  submitForm(): void {
    const value = this.feedbackForm.value;
    this.feedBackSubmit.emit(value);
    console.log(value);
    this.feedbackForm.reset();
  }
}
