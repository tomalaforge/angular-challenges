import {
  Component,
  OnInit,
  ViewEncapsulation,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card [list]="students()" customClass="bg-light-green">
    <ng-container ngProjectAs="card-image">
      <img src="assets/img/student.webp" width="200px" />
    </ng-container>

    <ng-template let-item="item" #nameTemplate>
      {{ item.firstname }}
      <ng-container ngProjectAs="delete-button">
        <button (click)="delete(item.id)">
          <img class="h-5" src="assets/svg/trash.svg" />
        </button>
      </ng-container>
    </ng-template>

    <ng-container ngProjectAs="add-button">
      <button
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="add()">
        Add
      </button>
    </ng-container>
  </app-card>`,
  standalone: true,
  styles: [
    `
      app-card .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [CardComponent],
})
export class StudentCardComponent implements OnInit {
  students: WritableSignal<Student[]> = signal([]);

  constructor(private http: FakeHttpService, private store: StudentStore) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));

    this.store.students$.subscribe((s) => this.students.set(s));
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  add() {
    this.store.addOne(randStudent());
  }
}
