import {
  Component,
  OnInit,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { JsonPipe } from '@angular/common';
import { ListItemDirective } from '../../ui/list-item-directive/list-item.directive';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students()"
    [type]="cardType"
    customClass="bg-light-green">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template listItem let-rowItem>
      <app-list-item [id]="rowItem.id" [type]="cardType">{{
        rowItem.firstname
      }}</app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, JsonPipe, ListItemDirective],
  encapsulation: ViewEncapsulation.None,
})
export class StudentCardComponent implements OnInit {
  students: WritableSignal<Student[]> = this.store.students;
  cardType = CardType.STUDENT;

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
