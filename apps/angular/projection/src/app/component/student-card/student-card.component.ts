import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardContentTemplateDirective } from '../../directive/card-content-template.directive';
import { CardHeaderTemplateDirective } from '../../directive/card-header-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  templateUrl: 'student-card.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderTemplateDirective,
    CardContentTemplateDirective,
    ListItemComponent,
  ],
})
export class StudentCardComponent implements OnInit {
  store = inject(StudentStore);
  http = inject(FakeHttpService);

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }

  addStudent() {
    this.store.addOne(randStudent());
  }

  deleteStudent(id: number) {
    this.store.deleteOne(id);
  }
}
