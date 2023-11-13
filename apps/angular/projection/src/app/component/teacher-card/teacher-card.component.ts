import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  ViewEncapsulation,
  effect,
  inject,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card [list]="teachers()" customClass="bg-light-red">
    <ng-container ngProjectAs="card-image">
      <img src="assets/img/teacher.png" width="200px" />
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
  styles: [
    `
      app-card .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
})
export class TeacherCardComponent {
  private store = inject(TeacherStore);
  private fetchTeachers = toSignal(inject(FakeHttpService).fetchTeachers$, {
    initialValue: [],
  });
  teachers: Signal<Teacher[]> = this.store.teachers;

  constructor() {
    effect(
      () => {
        this.store.addAll(this.fetchTeachers());
      },
      { allowSignalWrites: true }
    );
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }

  add() {
    this.store.addOne(randTeacher());
  }
}
