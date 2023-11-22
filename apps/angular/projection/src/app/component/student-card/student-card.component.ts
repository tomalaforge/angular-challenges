import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardDirective } from '../../ui/card/card.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="store.students()"
    (add)="addNewStudent()"
    class="bg-light-green">
    <img src="assets/img/student.webp" width="200px" />
    <ng-template template-row let-student>
      <app-list-item (delete)="deleteStudent(student.id)">
        {{ student.firstname }}
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  imports: [CardComponent, CardDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private readonly http: FakeHttpService = inject(FakeHttpService);
  public readonly store: StudentStore = inject(StudentStore);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addNewStudent(): void {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
