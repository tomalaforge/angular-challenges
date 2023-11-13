import {
  Component,
  ViewEncapsulation,
  inject,
  Signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-card',
  template: `<app-card [list]="students()" customClass="bg-light-green">
    <ng-container ngProjectAs="card-image">
      <img src="assets/img/student.webp" width="200px" />
    </ng-container>

    <ng-template let-item="item" #listItem>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
})
export class StudentCardComponent {
  private store = inject(StudentStore);
  private fetchStudents = toSignal(inject(FakeHttpService).fetchStudents$, {
    initialValue: [],
  });
  students: Signal<Student[]> = this.store.students;

  constructor() {
    effect(
      () => {
        this.store.addAll(this.fetchStudents());
      },
      { allowSignalWrites: true }
    );
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  add() {
    this.store.addOne(randStudent());
  }
}
