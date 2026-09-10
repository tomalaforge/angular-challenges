import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      (addEvent)="addNewTeacher()"
      [backgroundColor]="'rgba(250, 0, 0, 0.1)'">
      <img
        head-img
        src="assets/img/teacher.png"
        width="200"
        height="200"
        alt=""
        class="img" />

      <ng-template #itemContent let-item let-type="type">
        <app-list-item
          [name]="item.firstName"
          [id]="item.id"
          (deleted)="deleteTeacher($event)" />
      </ng-template>
    </app-card>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;
  cardType = CardType.TEACHER;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  addNewTeacher = () => {
    this.store.addOne(randTeacher());
  };

  deleteTeacher = (id: number) => {
    this.store.deleteOne(id);
  };
}
