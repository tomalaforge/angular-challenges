import { Component, OnInit, signal } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { Student } from '../../model/student.model';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (add)="addOne()" class="bg-green-200">
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
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students = signal<Student[]>([]);

  constructor(
    private http: FakeHttpService,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => {
      this.students.update(() => s)
    });
  }

  addOne() {
    this.students.update(value => [...value, randStudent()])
  }

  deleteOne(id: number) {
    this.students.update(value => value.filter((s) => s.id !== id))
  }
}
