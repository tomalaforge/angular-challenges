import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  standalone: true,
  selector: 'app-student-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  template: `
    <app-card class="bg-light-green" [list]="students$()" (add)="add()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template appCardRow let-student>
        <app-list-item (delete)="delete(student.id)">
          {{ student.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
})
export class StudentCardComponent implements OnInit {
  readonly students$ = this.studentStore.data$;

  constructor(
    private http: FakeHttpService,
    private studentStore: StudentStore
  ) {}

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.studentStore.addAll(s));
  }

  add(): void {
    this.studentStore.addOne(randStudent());
  }
  delete(id: number): void {
    this.studentStore.deleteOne(id);
  }
}
