import { Component, inject, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { UnSubscribeOnDestroy } from '../abstract/unsubscribe.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      customClass="bg-light-red"
      [items]="teachers()"
      (additems)="addTeacher()">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template #listTemplate let-teacher>
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
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent
  extends UnSubscribeOnDestroy
  implements OnInit
{
  private readonly http = inject(FakeHttpService);
  private readonly teacherStore = inject(TeacherStore);

  teachers = this.teacherStore.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((t) => this.teacherStore.addAll(t));
  }

  public addTeacher(): void {
    this.teacherStore.addOne(randTeacher());
  }

  public deleteTeacher(id: number): void {
    this.teacherStore.deleteOne(id);
  }
}
