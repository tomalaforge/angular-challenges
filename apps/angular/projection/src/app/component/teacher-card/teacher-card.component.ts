import { Component, OnInit, inject } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardContentTemplateDirective } from '../../directive/card-content-template.directive';
import { CardHeaderTemplateDirective } from '../../directive/card-header-template.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  templateUrl: 'teacher-card.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardHeaderTemplateDirective,
    CardContentTemplateDirective,
    ListItemComponent,
  ],
})
export class TeacherCardComponent implements OnInit {
  store = inject(TeacherStore);
  http = inject(FakeHttpService);

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }

  addTeacher() {
    this.store.addOne(randTeacher());
  }

  deleteTeacher(id: number) {
    this.store.deleteOne(id);
  }
}
