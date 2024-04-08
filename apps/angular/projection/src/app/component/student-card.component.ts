import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { FakeHttpService } from '../data-access/fake-http.service';
import { StudentStore } from '../data-access/student.store';
import { CardComponent, ItemDirective } from '../ui/card.component';
import { ListItemComponent } from '../ui/list-item.component';
import { randStudent } from './../data-access/fake-http.service';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="store.students()"
      (addItem)="store.addOne(randStudent())"
      class="bg-light-green">
      <img src="assets/img/student.webp" width="200px" />

      <ng-template [appItem]="store.students()" let-item>
        <app-list-item [id]="item.id" (delete)="store.deleteOne(item.id)">
          {{ item.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, ItemDirective],
})
export class StudentCardComponent {
  private http = inject(FakeHttpService);
  protected store = inject(StudentStore);
  randStudent = () => randStudent();

  constructor() {
    this.http.fetchStudents$
      .pipe(
        tap((s) => this.store.addAll(s)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }
}
