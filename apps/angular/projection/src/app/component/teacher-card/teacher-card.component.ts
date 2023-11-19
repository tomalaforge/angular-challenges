import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Signal,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { CardDirective } from '../../ui/directive/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  standalone: true,
  imports: [CardComponent, ListItemComponent, CardDirective],
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
    [list]="teachers$()"
    (add)="onAddNewItem()">
    <img src="assets/img/teacher.png" width="200px" />
    <ng-template tmplRow let-teacher>
      <app-list-item (delete)="onDeleteAnItem(teacher.id)">
        {{ teacher.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
})
export class TeacherCardComponent implements OnInit {
  private http: FakeHttpService = inject(FakeHttpService);
  private store: TeacherStore = inject(TeacherStore);
  teachers$: Signal<Teacher[]> = toSignal(this.store.teachers$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  public onAddNewItem(): void {
    this.store.addOne(randTeacher());
  }

  public onDeleteAnItem(id: number): void {
    this.store.deleteOne(id);
  }
}
