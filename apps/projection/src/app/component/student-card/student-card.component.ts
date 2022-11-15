import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { CardComponent, CardContentComponent } from '../../ui/card';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Student } from '../../model';
import { StudentService, StudentStore } from '../../data-access';
import { ListComponent, ListItemComponent } from '../../ui/list';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    CardContentComponent,
    ListComponent,
    ListItemComponent,
    AsyncPipe,
    NgForOf,
  ],
})
export class StudentCardComponent implements OnInit {
  readonly lightGreen = 'rgba(0, 250, 0, 0.1)';

  private readonly studentStore = inject(StudentStore);
  private readonly studentService = inject(StudentService);
  readonly students$ = this.studentStore.students$;

  ngOnInit() {
    this.studentService.loadData().subscribe();
  }

  add() {
    this.studentService.addStudent();
  }

  delete(id: number) {
    this.studentService.deleteStudent(id);
  }

  trackBy(index: number, student: Student): number {
    return student.id;
  }
}
