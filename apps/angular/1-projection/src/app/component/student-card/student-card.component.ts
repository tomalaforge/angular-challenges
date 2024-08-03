import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { isStudentEntity } from '../../utils';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      [list]="students"
      [listItemTemplate]="listItem"
      (onAddNewItem)="addNewItem()">
      <img avatar src="assets/img/student.webp" width="200px" />
    </app-card>

    <ng-template #listItem let-person>
      <app-list-item
        *ngIf="isStudentEntity(person)"
        [name]="person.firstName"
        [id]="person.id"
        (onDeleteItem)="deleteItem($event)"></app-list-item>
    </ng-template>
  `,
  standalone: true,
  styles: [
    `
      :host {
        --app-card-background: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgIf, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students: Student[] = [];

  private readonly destroyRef = inject(DestroyRef);

  private readonly http: FakeHttpService = inject(FakeHttpService);

  private readonly store: StudentStore = inject(StudentStore);

  ngOnInit(): void {
    this.http.fetchStudents$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((students: Student[]) => this.store.addAll(students));

    this.store.students$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((students: Student[]) => (this.students = students));
  }

  addNewItem(): void {
    this.store.addOne(randStudent());
  }

  deleteItem(id: number): void {
    this.store.deleteOne(id);
  }

  protected readonly isStudentEntity = isStudentEntity;
}
