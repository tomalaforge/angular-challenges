import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
      [items]="teachers()"
      [rowTmp]="listItemTemplate"
      (add)="onAdd()"
      class="bg-light-red">
      <img src="../../../assets/img/teacher.png" width="200px" />
      <ng-template #listItemTemplate let-teacher>
        <app-list-item (delete)="onDelete(teacher.id)">
          {{ teacher.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent {
  private httpFakeService = inject(FakeHttpService);
  private store = inject(TeacherStore);
  teachers = this.store.teachers;

  constructor() {
    this.httpFakeService.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  onDelete(id: number): void {
    this.store.deleteOne(id);
  }

  onAdd(): void {
    this.store.addOne(randTeacher());
  }
}
