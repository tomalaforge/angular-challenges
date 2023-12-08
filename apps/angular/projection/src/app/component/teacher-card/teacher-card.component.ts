import { Component, OnInit, signal } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card [list]="teachers()" class="bg-red-400">
      <img src="assets/img/teacher.png" width="200px" />
      <ng-template #rowRef let-teacher>
        <app-list-item (delete)="deleteOne(teacher.id)">
          {{ teacher.firstname }} {{ teacher.lastname }}
        </app-list-item>
      </ng-template>
    </app-card>
  `,
  styles: [],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers = signal<Teacher[]>([]);

  constructor(private http: FakeHttpService) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.teachers.update(() => t));
  }
  addOne() {
    this.teachers.update((value) => [...value, randTeacher()]);
  }

  deleteOne(id: number) {
    this.teachers.update((value) => value.filter((s) => s.id !== id));
  }
}
