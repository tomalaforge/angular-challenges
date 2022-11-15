import { Component, inject, OnInit } from '@angular/core';
import { CardComponent, CardContentComponent } from '../../ui/card';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Teacher } from '../../model';
import { TeacherService, TeacherStore } from '../../data-access';
import { ListComponent, ListItemComponent } from '../../ui/list';

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  standalone: true,
  imports: [
    CardComponent,
    CardContentComponent,
    ListComponent,
    ListItemComponent,
    NgForOf,
    AsyncPipe,
  ],
})
export class TeacherCardComponent implements OnInit {
  private readonly teacherStore = inject(TeacherStore);
  private readonly teacherService = inject(TeacherService);

  readonly teachers$ = this.teacherStore.teachers$;
  readonly lightRed = 'rgba(250, 0, 0, 0.1)';

  ngOnInit() {
    this.teacherService.loadData().subscribe();
  }

  add() {
    this.teacherService.addTeacher();
  }

  delete(id: number) {
    this.teacherService.deleteTeacher(id);
  }

  trackBy(index: number, teacher: Teacher): number {
    return teacher.id;
  }
}
