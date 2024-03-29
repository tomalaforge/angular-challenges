import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { ListItemDirective } from '../../ui/list-item/list-item.directive';
import { type } from '../../utils/type-helper';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" (add)="addStudent()" [bgColor]="bgColor">
      <img src="assets/img/student.webp" width="200px" />

      <ng-template [listItem]="type" let-item="item">
        <app-list-item [name]="item.firstName" (deleted)="delete(item.id)" />
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [],
  imports: [CardComponent, ListItemComponent, ListItemDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);

  public students = toSignal(this.store.students$, { initialValue: [] });
  public readonly bgColor = 'rgba(0, 250, 0, 0.1)';
  public readonly type = type<Student>();

  public ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  public delete(id: number): void {
    this.store.deleteOne(id);
  }

  public addStudent(): void {
    this.store.addOne(randStudent());
  }
}
