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
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students()"
      [type]="cardType"
      customClass="bg-light-green">
      <img
        slot="image"
        ngSrc="assets/img/student.webp"
        width="200"
        height="200" />
      <button
        slot="addItem"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addStudent()">
        Add
      </button>
    </app-card>
  `,
  imports: [CardComponent, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private studentStore = inject(StudentStore);

  students = this.studentStore.students;
  cardType = CardType.STUDENT;

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.studentStore.addAll(s));
  }

  addStudent() {
    this.studentStore.addOne(randStudent());
  }
}
