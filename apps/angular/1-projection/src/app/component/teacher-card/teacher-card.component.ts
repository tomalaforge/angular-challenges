import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { first } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardItemDirective } from '../../ui/card/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [items]="teachers()"
      customClass="bg-light-red"
      (addItem)="addTeacher()">
      <img image src="assets/img/teacher.png" width="200px" />
      <ng-template cardItem let-teacher>
        <app-list-item
          (deleteItem)="deleteTeacher(teacher.id)"
          [id]="teacher.id"
          [name]="teacher.firstName" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [
    CardComponent,
    ListItemComponent,
    CardItemDirective,
    CardComponent,
    ListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  readonly #store = inject(TeacherStore);
  readonly teachers = this.#store.teachers;
  readonly #http = inject(FakeHttpService);

  ngOnInit(): void {
    this.#http.fetchTeachers$
      .pipe(first())
      .subscribe((t) => this.#store.addAll(t));
  }

  addTeacher(): void {
    this.#store.addOne(randTeacher());
  }

  deleteTeacher(id: number): void {
    this.#store.deleteOne(id);
  }
}
