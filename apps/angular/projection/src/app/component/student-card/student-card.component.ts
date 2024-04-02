import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardHeaderTemplateDirective } from '../../directive/card-header-template.directive';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-student-card',
  templateUrl: 'student-card.component.html',
  standalone: true,
  imports: [CardComponent, CardHeaderTemplateDirective],
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
