import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardViewModel } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { CardRowDirective } from '../../ui/card/card-row.directive';

@Component({
  standalone: true,
  selector: 'app-teacher-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, CardComponent, CardRowDirective, ListItemComponent],
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  template: `
    <app-card [list]="datasource$ | async" (add)="add()" class="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template appCardRow let-teacher>
        <app-list-item (delete)="delete(teacher.id)">
          {{ teacher.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
})
export class TeacherCardComponent implements OnInit, CardViewModel<Teacher> {
  datasource$ = this.store.teachers$;

  constructor(private http: FakeHttpService, private store: TeacherStore) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  add(): void {
    this.store.addOne(randTeacher());
  }
  delete(id: number): void {
    this.store.deleteOne(id);
  }
}
