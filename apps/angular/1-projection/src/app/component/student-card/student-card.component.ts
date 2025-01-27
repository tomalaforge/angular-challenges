import {
  Component,
  inject,
  Injector,
  OnInit,
  signal,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import {
  AddButton,
  DeleteButton,
  Image,
} from '../../directive/slots.directive';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" customClass="bg-light-green">
      <img
        image
        src="assets/img/student.webp"
        width="200px"
        alt="student image" />
      <ng-template #listTemplate let-student>
        <app-list-item>
          {{ student.firstName }}
          <button (click)="deleteStudent(student.id)" delete-button>
            <img class="h-5" src="assets/svg/trash.svg" alt="icon trash" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        (click)="addStudent()"
        add-button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, Image, AddButton, DeleteButton],
  encapsulation: ViewEncapsulation.None,
})
export class StudentCardComponent implements OnInit {
  students: Signal<Student[]> = signal([]);
  inject = inject(Injector);
  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
    this.students = toSignal(this.store.students$, {
      injector: this.inject,
      initialValue: [],
    });
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }

  addStudent() {
    this.store.addOne(randStudent());
  }
}
