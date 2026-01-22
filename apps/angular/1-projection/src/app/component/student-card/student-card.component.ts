import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [templateType]="student"
      (itemAdded)="onStudentAdded()"
      customClass="bg-light-green">
      <img
        ngSrc="assets/img/student.webp"
        width="200"
        height="200"
        ngProjectAs="card-image" />
    </app-card>

    <ng-template #student let-item>
      <app-list-item
        [name]="item.firstName"
        [id]="item.id"
        (deleted)="onStudentDeleted($event)" />
    </ng-template>
  `,
  imports: [CardComponent, ListItemComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  students = this.store.students.asReadonly();

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  onStudentAdded() {
    this.store.addOne(randStudent());
  }

  onStudentDeleted(id: number) {
    this.store.deleteOne(id);
  }
}
