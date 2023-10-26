import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Observable, tap } from 'rxjs';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <ng-container *ngIf="fetchedTeachers$ | async as fetchedTeachers">
      <ng-container *ngIf="teachers$ | async as teachers">
        <app-card customClass="bg-light-red">
          <img
            alt="teacher"
            cardImage
            src="assets/img/teacher.png"
            width="200px" />
          <button
            addNewItemBtn
            class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
            (click)="addNewItem()">
            Add
          </button>
          <ng-template #listItemTemplate let-teacher>
            <app-list-item
              (delete)="delete($event)"
              *ngFor="let item of teachers"
              [id]="item.id">
              <ng-container name>{{ item.firstname }}</ng-container>
            </app-list-item>
          </ng-template>
        </app-card>
      </ng-container>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule, NgIf, CardComponent, ListItemComponent],
})
export class TeacherCardComponent {
  private store = inject(TeacherStore);
  private http = inject(FakeHttpService);

  teachers$: Observable<Teacher[]> = this.store.teachers$;
  fetchedTeachers$: Observable<Teacher[]> = this.http.fetchTeachers$.pipe(
    tap((t) => this.store.addAll(t))
  );

  addNewItem() {
    this.store.addOne(randTeacher());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
