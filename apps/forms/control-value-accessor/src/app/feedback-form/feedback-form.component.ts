import { JsonPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Feedback } from '../feedback';
import { RatingControlComponent } from '../rating-control/rating-control.component';

@Component({
  standalone: true,
  imports: [RatingControlComponent, ReactiveFormsModule, JsonPipe, FormsModule],
  selector: 'app-feedback-form',
  templateUrl: 'feedback-form.component.html',
  styleUrls: ['feedback-form.component.scss'],
})
export class FeedbackFormComponent {
  @Output()
  readonly feedBackSubmit: EventEmitter<Feedback> =
    new EventEmitter<Feedback>();

  submitForm(value: Feedback): void {
    this.feedBackSubmit.emit(value);
  }
}
