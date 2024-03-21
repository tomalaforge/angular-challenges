import { NgTemplateOutlet } from '@angular/common';
import { Component, Signal } from '@angular/core';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" backgroundColor="rgba(0, 250, 0, 0.1)">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template deleteButton let-item>
        <app-list-item [id]="item.id" (listItemDelete)="deleteStudent($event)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addStudent()">
        Add
      </button>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgTemplateOutlet, ListItemComponent],
})
export class StudentCardComponent {
  students: Signal<Student[]> = this.store.students$;

  constructor(private store: StudentStore) {}

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
