import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CardComponent, ListItemComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  template: `<app-card
    class="bg-light-green"
    [list]="students$ | async"
    (add)="onAddNewItem()">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template #tmplRow let-student>
      <app-list-item (delete)="onDeleteAnItem(student.id)">
        {{ student.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
})
export class StudentCardComponent implements OnInit {
  students$!: Observable<Student[]>;
  private http: FakeHttpService = inject(FakeHttpService);
  private store: StudentStore = inject(StudentStore);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe(this.store.addAll);
    this.students$ = this.store.students$;
  }

  public onAddNewItem(): void {
    this.store.addOne(randStudent());
  }

  public onDeleteAnItem(id: number): void {
    this.store.deleteOne(id);
  }
}
