import { Component, inject, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [itemTemplateRef]="listItemTemplate"
      (itemAdded)="addItem()"
      customClass="bg-light-red">
      <img src="assets/img/teacher.png" card-image width="200" height="200" />
    </app-card>
    <ng-template #listItemTemplate let-item>
      {{ item.firstName }}
      <button (click)="onItemDeleted(item)">
        <img class="h-5" src="assets/svg/trash.svg" />
      </button>
    </ng-template>
  `,
  styles: [
    `
      ::ng-deep .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(TeacherStore);

  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  onItemDeleted(item: any) {
    this.store.deleteOne(item.id);
  }
  addItem() {
    this.store.addOne(randTeacher());
  }
}
