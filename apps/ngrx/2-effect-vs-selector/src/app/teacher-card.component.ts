import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { EnhancedActivity } from './store/activity/activity.model';

@Component({
  selector: 'app-teacher-card',
  template: `
    <h2>Activity Name: {{ activity().name }}</h2>
    <p>Main teacher: {{ activity().mainTeacher.name }}</p>
    <span>All teachers available for : {{ activity().type }} are</span>
    <ul>
      @for (teacher of activity().availableTeachers; track teacher.id) {
        <li>{{ teacher.name }}</li>
      }
    </ul>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        border: solid;
        border-width: 1px;
        border-color: black;
        padding: 2px;
      }
    `,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  activity = input.required<EnhancedActivity>();
}
