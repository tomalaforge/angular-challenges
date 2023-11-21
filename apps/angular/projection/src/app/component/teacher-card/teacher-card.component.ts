import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  standalone: true,
  selector: 'app-teacher-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  template: `
    <app-card [list]="teachers$()" (add)="add()" class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template appCardRow let-teacher>
        <app-list-item (delete)="delete(teacher.id)">
          {{ teacher.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
})
export class TeacherCardComponent implements OnInit {
  readonly teachers$ = this.teacherStore.data$;

  constructor(
    private http: FakeHttpService,
    private teacherStore: TeacherStore
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.teacherStore.addAll(t));
  }

  add(): void {
    this.teacherStore.addOne(randTeacher());
  }
  delete(id: number): void {
    this.teacherStore.deleteOne(id);
  }
}
