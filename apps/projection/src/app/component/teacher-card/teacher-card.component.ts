import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { takeUntil } from 'rxjs';
import { DestroyService } from '../../service/destroy.service';
import { CardRowDirective } from '../../directive/card-row/card-row.directive';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: ` <app-card [list]="teachers()" (addItem)="onAddItem()">
    <img card-img src="assets/img/teacher.png" alt="" width="200px" />
    <ng-template [appCardRow]="teachers()" let-teacher>
      <app-list-item (delete)="onDeleteItem(teacher.id)">
        <div>{{ teacher.firstname }} {{ teacher.lastname }}</div>
        <div>{{ teacher.subject }}</div>
      </app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      :host {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  providers: [DestroyService],
  imports: [CardComponent, CardRowDirective, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);
  private destroy$ = inject(DestroyService);

  teachers = toSignal<Teacher[], Teacher[]>(this.store.teachers$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.http.fetchTeachers$
      .pipe(takeUntil(this.destroy$))
      .subscribe((t) => this.store.addAll(t));
  }

  onAddItem(): void {
    this.store.addOne(randTeacher());
  }

  onDeleteItem(id: number): void {
    this.store.deleteOne(id);
  }
}
