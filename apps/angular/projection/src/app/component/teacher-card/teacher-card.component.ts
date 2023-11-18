import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  template: `<app-card
    class="bg-light-red"
    [list]="teachers$ | async"
    (add)="onAddNewItem()">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template #tmplRow let-teacher>
      <app-list-item (delete)="onDeleteAnItem(teacher.id)">
        {{ teacher.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
})
export class TeacherCardComponent implements OnInit {
  teachers$!: Observable<Teacher[]>;
  private http: FakeHttpService = inject(FakeHttpService);
  private store: TeacherStore = inject(TeacherStore);

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe(this.store.addAll);
    this.teachers$ = this.store.teachers$;
  }

  public onAddNewItem(): void {
    this.store.addOne(randTeacher());
  }

  public onDeleteAnItem(id: number): void {
    this.store.deleteOne(id);
  }
}
