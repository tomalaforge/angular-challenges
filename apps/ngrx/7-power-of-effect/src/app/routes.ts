import { Route } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';

export const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'teacher' },
  {
    path: 'teacher',
    component: TeacherComponent,
  },
  {
    path: 'student',
    loadComponent: () =>
      import('./student/student.component').then((m) => m.StudentComponent),
  },
  {
    path: 'school',
    loadComponent: () =>
      import('./school/school.component').then((m) => m.SchoolComponent),
  },
];
