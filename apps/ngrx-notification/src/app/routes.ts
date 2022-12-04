import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'teacher' },
  {
    path: 'teacher',
    loadComponent: () =>
      import('./teacher/teacher.component').then((m) => m.TeacherComponent),
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
