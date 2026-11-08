import {
  ChangeDetectionStrategy,
  Component,
  input,
} from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CityStore } from '../../data-access/city.store';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-list-item',
  template: `
    <div class="flex justify-between border border-gray-300 px-2 py-1">
      {{ name() }}
      <ng-container *ngTemplateOutlet="deleteButton;context:{$implicit: store()}"></ng-container>
      <ng-template #deleteButton let-service>
        <button (click)="delete(service, id())">
          <img class="h-5" src="assets/svg/trash.svg" alt="trash" />
        </button>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet]
})
export class ListItemComponent {

  readonly id = input.required<number>();
  readonly name = input.required<string>();
  readonly store = input.required<TeacherStore | StudentStore | CityStore>();

  delete(service: TeacherStore | StudentStore | CityStore, id: number) {
    service.deleteOne(id);
  }
}
