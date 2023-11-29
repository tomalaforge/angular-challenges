import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardTemplateContentDirective } from '../../ui/card/card-template-content.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students$ | async"
    [type]="cardType"
    customClass="bg-light-green"
    (addItemEvent)="addStudent()">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template let-student appCardTemplateContent>
      <app-list-item
        [id]="student?.id"
        [name]="student?.firstname"
        (deleteItem)="deleteStudent($event)"></app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      :host {
        --card-bg-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    ListItemComponent,
    CardTemplateContentDirective,
    AsyncPipe,
  ],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;
  students$!: Observable<Student[]>;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.students$ = this.store.students$;
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
