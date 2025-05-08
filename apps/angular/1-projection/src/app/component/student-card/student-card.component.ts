import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [store]="studentStore"
      (addNewItem)="addNewItem()"
      [list]="students()"
      [type]="cardType"
      customClass="bg-light-green">
      <img ngSrc="assets/img/student.webp" width="200" height="200" />
    </app-card>
  `,
  styles: [],
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  public readonly store = inject(StudentStore);
  public studentStore = inject(StudentStore);

  students = this.store.students;
  cardType = CardType.STUDENT;
  deleteItem = output<Event>();

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewItem() {
    this.studentStore.addOne(randStudent());
  }
}
