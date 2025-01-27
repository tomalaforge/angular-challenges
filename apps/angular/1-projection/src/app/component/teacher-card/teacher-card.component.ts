import {
  Component,
  inject,
  Injector,
  OnInit,
  Signal,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import {
  AddButton,
  DeleteButton,
  Image,
} from '../../directive/slots.directive';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" customClass="bg-light-red">
      <img
        image
        src="assets/img/teacher.png"
        width="200px"
        alt="teacher-image" />
      <ng-template #listTemplate let-teacher>
        <app-list-item>
          {{ teacher.firstName }}
          <button (click)="deleteTeacher(teacher.id)" delete-button>
            <img class="h-5" src="assets/svg/trash.svg" alt="icon trash" />
          </button>
        </app-list-item>
      </ng-template>
      <button
        (click)="addTeacher()"
        add-button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2">
        Add
      </button>
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent, Image, AddButton, DeleteButton],
  encapsulation: ViewEncapsulation.None,
})
export class TeacherCardComponent implements OnInit {
  teachers: Signal<Teacher[]> = signal([]);
  inject = inject(Injector);
  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
    this.teachers = toSignal(this.store.teachers$, {
      injector: this.inject,
      initialValue: [],
    });
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }
}
