import { Component, inject } from '@angular/core';
import { randStudent } from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-card',
  template: `
    @if (students$ | async; as students) {
      <app-card [list]="students" customClass="bg-light-green">
        <img src="assets/img/student.webp" width="200px" alt="" />

        <ng-template let-item #cardContent>
          <app-list-item
            [name]="item.firstname"
            (deleteEmitter)="deleteStudent(item.id)">
          </app-list-item>
        </ng-template>

        <ng-template #cardButtons>
          <button
            class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
            (click)="addNewStudent()">
            Add
          </button>
        </ng-template>
      </app-card>
    }
  `,
  standalone: true,
  styles: [
    `
      :host::ng-deep.bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgIf, AsyncPipe, ListItemComponent],
})
export class StudentCardComponent {
  private readonly _store = inject(StudentStore);
  protected readonly students$: Observable<Student[]> = this._store.students$;

  addNewStudent(): void {
    this._store.addOne(randStudent());
  }

  deleteStudent(id: number): void {
    this._store.deleteOne(id);
  }
}
