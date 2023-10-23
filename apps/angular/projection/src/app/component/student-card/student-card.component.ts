import { Component, OnInit, inject } from '@angular/core';
import { FakeHttpService, randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardType } from '../../model/card.model';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `
  <app-card [list]="students"
            [type]="cardType"
            (delete)="delete($event)"
            customClass="bg-light-green">
    <img alt="student"
         cardImage
         src="assets/img/student.webp"
         width="200px" />
    <button addNewItemBtn
            class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
            (click)="addNewItem()">
           Add
    </button>
  </app-card>
  `,
  standalone: true,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];
  cardType = CardType.STUDENT;
  private store = inject(StudentStore);
  private http = inject(FakeHttpService);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => (this.students = s));
  }

  addNewItem() {
    this.store.addOne(randStudent());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  
}
