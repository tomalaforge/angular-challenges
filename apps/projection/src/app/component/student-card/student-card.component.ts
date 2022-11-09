import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Item } from '../../model/item.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [items]="studentItems$ | async"
    customClass="bg-light-green"
    [listItemTemplate]="listItemTemplate"
    (addNewItem)="addNewStudent()"
    (deleteItem)="deleteStudent($event)">
    <ng-container image>
      <img src="assets/img/student.webp" width="200px" image />
    </ng-container>
    <ng-template #listItemTemplate let-item>{{ item?.name }} (S)</ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  studentItems$!: Observable<Item[]>;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.studentItems$ = this.store.students$.pipe(
      map((students) =>
        students.map(
          (s) => ({ name: `${s.lastname} ${s.firstname}`, id: s.id } as Item)
        )
      )
    );
  }

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
