import { NgTemplateOutlet } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemRefDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" backgroundColor="rgba(250, 0, 0, 0.1)">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template deleteButton let-item>
        <app-list-item (listItemDelete)="deleteTeacher(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addTeacher()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [
    CardComponent,
    NgTemplateOutlet,
    ListItemComponent,
    ListItemRefDirective,
  ],
})
export class TeacherCardComponent {
  teachers: Signal<Teacher[]> = this.store.teachers$;

  constructor(private store: TeacherStore) {}

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
