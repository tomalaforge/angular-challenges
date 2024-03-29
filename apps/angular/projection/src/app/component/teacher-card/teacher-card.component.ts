import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { type } from '../../utils/type-helper';
import { Teacher } from '../../model/teacher.model';
import { ListItemDirective } from '../../ui/list-item/list-item.directive';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" (add)="addTeacher()" [bgColor]="bgColor">
      <img src="assets/img/teacher.png" width="200px" />

      <ng-template [listItem]="type" let-item="item">
        <app-list-item [name]="item.firstName" (deleted)="delete(item.id)" />
      </ng-template>
    </app-card>
  `,
  styles: [],
  standalone: true,
  imports: [CardComponent, ListItemComponent, ListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  public teachers = toSignal(this.store.teachers$, { initialValue: [] });
  public readonly bgColor = 'rgba(250, 0, 0, 0.1)';
  public readonly type = type<Teacher>();

  public ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }

  public addTeacher(): void {
    this.store.addOne(randTeacher());
  }
}
