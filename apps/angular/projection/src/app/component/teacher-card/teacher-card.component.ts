import { Component, OnInit, ViewEncapsulation, signal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      [itemNameTemplate]="itemNameTemplate"
      (deleteItem)="deleteItem($event)"
      customClass="bg-light-red">
      <img cardImage src="assets/img/teacher.png" width="200px" />
      <button
        addButton
        class="border border-blue-500 bg-blue-300 p-2 rounded-sm"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
    <ng-template #itemNameTemplate let-name="firstname">{{ name }}</ng-template>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent],
  encapsulation: ViewEncapsulation.None,
})
export class TeacherCardComponent implements OnInit {
  teachers = signal<Teacher[]>([]);

  constructor(private http: FakeHttpService) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.teachers.set(t));
  }

  addNewItem() {
    this.teachers.update((val) => [...val, randTeacher()]);
  }

  deleteItem(id: number) {
    this.teachers.update((val) => val.filter((t) => t.id !== id));
  }
}
