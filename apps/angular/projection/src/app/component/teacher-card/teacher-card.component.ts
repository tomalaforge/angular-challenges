import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="store.teachers"
      customClass="bg-light-red"
      (add)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template #rowRef let-teacher>
        <app-list-item (delete)="deleteTeacher(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  private http = inject(FakeHttpService);
  protected store = inject(TeacherStore);

  constructor() {
    const fetchTeachers = toSignal(this.http.fetchTeachers$, {
      initialValue: [],
    });

    effect(
      () => {
        this.store.addAll(fetchTeachers());
      },
      { allowSignalWrites: true },
    );
  }

  deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }

  addTeacher(): void {
    this.store.addOne(randTeacher());
  }
}
