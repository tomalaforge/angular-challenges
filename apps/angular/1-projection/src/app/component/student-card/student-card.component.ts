import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntil } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';

import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { UnSubscribeOnDestroy } from '../abstract/unsubscribe.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [items]="students()"
      customClass="bg-light-green"
      (additems)="addStudent()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template #listTemplate let-student>
        <app-list-item (delete)="deleteStudent(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      ::ng-deep .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent
  extends UnSubscribeOnDestroy
  implements OnInit
{
  private readonly http = inject(FakeHttpService);
  private readonly studentStore = inject(StudentStore);

  students = this.studentStore.students;

  ngOnInit(): void {
    this.http.fetchStudents$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((s) => this.studentStore.addAll(s));
  }

  public addStudent(): void {
    this.studentStore.addOne(randStudent());
  }

  public deleteStudent(id: number): void {
    this.studentStore.deleteOne(id);
  }
}
