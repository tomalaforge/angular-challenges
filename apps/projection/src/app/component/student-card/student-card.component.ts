import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardRowDirective } from '../../directive/card-row/card-row.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { DestroyService } from '../../service/destroy.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-student-card',
  template: ` <app-card [list]="students()" (addItem)="onAddItem()">
    <img card-img src="/assets/img/student.webp" alt="" width="200px" />
    <ng-template [appCardRow]="students()" let-student>
      <app-list-item (delete)="onDeleteItem(student.id)">
        <div>{{ student.firstname }} {{ student.lastname }}</div>
        <div>{{ student.school }}</div>
        <div>
          {{ student.mainTeacher.firstname }} {{ student.mainTeacher.lastname }}
        </div>
        <div>{{ student.mainTeacher.subject }}</div>
      </app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      :host {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  providers: [DestroyService],
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(StudentStore);
  private destroy$ = inject(DestroyService);

  students = toSignal(this.store.students$, {
    initialValue: [] as Student[],
  });

  ngOnInit(): void {
    this.http.fetchStudents$
      .pipe(takeUntil(this.destroy$))
      .subscribe((s) => this.store.addAll(s));
  }

  onAddItem(): void {
    this.store.addOne(randStudent());
  }

  onDeleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
