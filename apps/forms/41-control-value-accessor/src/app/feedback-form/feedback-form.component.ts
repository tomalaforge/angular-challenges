import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RatingControlComponent } from '../rating-control/rating-control.component';

@Component({
  imports: [RatingControlComponent, ReactiveFormsModule],
  selector: 'app-feedback-form',
  templateUrl: 'feedback-form.component.html',
  styleUrls: ['feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  @Output()
  readonly feedBackSubmit: EventEmitter<Record<string, string | null>> =
    new EventEmitter<Record<string, string | null>>();

  readonly feedbackForm = new FormGroup({
    name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: Validators.required,
    }),
    rating: new FormControl<string | null>(null, {
      validators: Validators.required,
    }),
    comment: new FormControl(),
  });

  submitForm(): void {
    if (this.feedbackForm.valid) {
      this.feedBackSubmit.emit(this.feedbackForm.value);
      this.feedbackForm.reset();
    }
  }
}
