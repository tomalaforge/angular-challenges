import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';

@Component({
  imports: [FeedbackFormComponent],
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <app-feedback-form (feedBackSubmit)="apiCall($event)"></app-feedback-form>
  `,
})
export class AppComponent {
  apiCall(event: Record<string, string | null>): void {
    console.log(event);
  }
}
