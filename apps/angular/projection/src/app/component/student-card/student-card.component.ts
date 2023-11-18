import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card [list]="students()" class="bg-light-green" (add)="addStudent()">
      <img src="assets/img/student.webp" width="200px" />
      <ng-template cardRow let-student>
        <app-list-item (delete)="deleteStudent(student.id)">
          {{ student.firstname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private readonly http = inject(FakeHttpService);
  private readonly store = inject(StudentStore);

  public students = this.store.students;

  private getInitialData$ = this.http.fetchStudents$.pipe(takeUntilDestroyed());

  public ngOnInit(): void {
    this.getInitialData$.subscribe((s) => this.store.addAll(s));
  }

  public addStudent(): void {
    this.store.addOne(randStudent());
  }

  public deleteStudent(id: number): void {
    this.store.deleteOne(id);
  }
}
