import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FakeHttpService } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';

import { randStudent } from '../../data-access/fake-http.service';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      img="assets/img/student.webp"
      customClass="bg-light-green"
      (addNewItem)="addItem()"
      (deleteItem)="deleteItem($event)" />
  `,
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);
  students = this.store.students;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
  addItem() {
    this.store.addOne(randStudent());
  }
  deleteItem(id: number) {
    this.store.deleteOne(id);
  }
}
