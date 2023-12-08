import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students | async" (add)="addOne()" class="bg-green-200">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template #rowRef let-student>
        <app-list-item (delete)="deleteOne(student.id)" >
          {{ student.firstname }} {{student.lastname}}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [],
  imports: [CardComponent, ListItemComponent, AsyncPipe],
})
export class StudentCardComponent implements OnInit {
  students = this.store.students$;
  cardType = CardType.STUDENT;

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => {
      this.store.addAll(s)
    });
  }

  addOne() {
    this.store.addOne(randStudent());
  }

  deleteOne(id: number) {
    this.store.deleteOne(id);
  }
}
