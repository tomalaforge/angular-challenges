import { NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { first } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [items]="students()"
      customClass="bg-light-green"
      (addItem)="addStudent()">
      <img image src="assets/img/student.webp" width="200px" />
      <ng-template cardItem let-student>
        <app-list-item
          (deleteItem)="deleteStudent(student.id)"
          [id]="student.id"
          [name]="student.firstName" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, NgIf, ListItemComponent, NgForOf, CardItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  readonly #store = inject(StudentStore);
  readonly students = this.#store.students;
  readonly #http = inject(FakeHttpService);

  ngOnInit(): void {
    this.#http.fetchStudents$
      .pipe(first())
      .subscribe((s) => this.#store.addAll(s));
  }

  addStudent(): void {
    this.#store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.#store.deleteOne(id);
  }
}
