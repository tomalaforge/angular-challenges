import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FakeHttpService, randTeacher } from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers()"
      customClass="bg-light-red"
      [content]="store">
      <img ngProjectAs="image-url" src="assets/img/teacher.png" width="200" height="200" alt="" />
      <button 
        ngProjectAs="add-button"
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add Teacher
      </button>
    </app-card>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  readonly store = inject(TeacherStore);
 
  teachers = this.store.teachers;

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
  addNewItem() {
    this.store.addOne(randTeacher());
  }

}
