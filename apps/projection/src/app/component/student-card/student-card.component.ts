import { Component, OnInit } from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent, CardListDirective } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card [list]="students" [type]="cardType" [isStudent]="true">
    <ng-template card-list let-item="item">
      <app-list-item
        [id]="item.id"
        [type]="item.type"
        [name]="item.firstname"
        (deleteEvent)="deleteStudent($event)"></app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,

  imports: [CardComponent, CardListDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }
  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
