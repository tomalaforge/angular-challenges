import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { FakeHttpService, randTeacher } from '../data-access/fake-http.service';
import { TeacherStore } from '../data-access/teacher.store';
import { CardComponent } from '../ui/card.component';
import { ListItemComponent } from '../ui/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="store.teachers()"
      (addItem)="store.addOne(randTeacher())"
      class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template #itemRef let-item>
        <app-list-item
          [label]="item.firstName"
          [id]="item.id"
          (delete)="store.deleteOne(item.id)"></app-list-item>
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
})
export class TeacherCardComponent {
  private http = inject(FakeHttpService);
  protected store = inject(TeacherStore);

  randTeacher = () => randTeacher();

  constructor() {
    this.http.fetchTeachers$
      .pipe(
        tap((t) => this.store.addAll(t)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
