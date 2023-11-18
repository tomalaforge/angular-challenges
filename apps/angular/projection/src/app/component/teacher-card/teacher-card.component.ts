import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (add)="addTeacher()" class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template cardRow let-teacher>
        <app-list-item (delete)="deleteTeacher(teacher.id)">
          {{ teacher.firstname }}
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
  imports: [CardComponent, ListItemComponent, CardRowDirective],
})
export class TeacherCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(TeacherStore);

  public teachers = this.store.teachers;

  private getInitialData$ = this.http.fetchTeachers$.pipe(takeUntilDestroyed());

  public ngOnInit(): void {
    this.getInitialData$.subscribe((t) => this.store.addAll(t));
  }

  public addTeacher(): void {
    this.store.addOne(randTeacher());
  }

  public deleteTeacher(id: number): void {
    this.store.deleteOne(id);
  }
}
