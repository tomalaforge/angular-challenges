import { NgIf } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { isTeacher } from '@angular-challenges/power-of-effect/model';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { isTeacherEntity } from '../../utils';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [listItemTemplate]="listItem"
      (onAddNewItem)="addNewItem()">
      <img avatar src="assets/img/teacher.png" width="200px" />
    </app-card>

    <ng-template #listItem let-person>
      <app-list-item
        *ngIf="isTeacherEntity(person)"
        [name]="person.firstName"
        [id]="person.id"
        (onDeleteItem)="deleteItem($event)"></app-list-item>
    </ng-template>
  `,
  styles: [
    `
      :host {
        --app-card-background: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, NgIf, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];

  private readonly destroyRef = inject(DestroyRef);

  private readonly http: FakeHttpService = inject(FakeHttpService);

  private readonly store: TeacherStore = inject(TeacherStore);

  ngOnInit(): void {
    this.http.fetchTeachers$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((teachers: Teacher[]) => this.store.addAll(teachers));

    this.store.teachers$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((teachers: Teacher[]) => (this.teachers = teachers));
  }

  addNewItem(): void {
    this.store.addOne(randTeacher());
  }

  deleteItem(id: number): void {
    this.store.deleteOne(id);
  }

  protected readonly isTeacher = isTeacher;
  protected readonly isTeacherEntity = isTeacherEntity;
}
