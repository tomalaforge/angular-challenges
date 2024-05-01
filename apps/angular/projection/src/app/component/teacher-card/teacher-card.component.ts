import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      class="bg-light-red"
      (addNewItemEvent)="addStudent()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template [cardRows]="teachers()" let-teacher>
        <app-list-item (deleteEvent)="deleteStudent(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  public teachers = toSignal(this.store.teachers$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randTeacher());
  }
  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
