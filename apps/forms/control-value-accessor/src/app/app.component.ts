import { Component } from '@angular/core';
import { Feedback } from './feedback';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

@Component({
  standalone: true,
  imports: [FeedbackFormComponent],
  selector: 'app-root',
  template: `
    <app-feedback-form (feedBackSubmit)="apiCall($event)"></app-feedback-form>
  `,
})
export class AppComponent {
  apiCall(event: Feedback): void {
    console.log(event);
  }
}
