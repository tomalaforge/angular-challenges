import { Component, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [items]="students()" (add)="onAdd()" class="bg-light-red">
      <img src="../../../assets/img/student.webp" width="200px" />
      <ng-template #entry let-student>
        <app-list-item (delete)="onDelete(student.id)">
          {{ student.firstName }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent {
  private httpFakeService = inject(FakeHttpService);
  private store = inject(StudentStore);
  students = this.store.students;

  constructor() {
    this.httpFakeService.fetchStudents$.subscribe((t) => this.store.addAll(t));
  }

  onDelete(id: number): void {
    this.store.deleteOne(id);
  }

  onAdd(): void {
    this.store.addOne(randStudent());
  }
}
