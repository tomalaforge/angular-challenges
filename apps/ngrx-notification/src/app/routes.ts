import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'teacher' },
  {
    path: 'teacher',
    loadComponent: () =>
      import('./teacher/teacher.component').then((c) => c.TeacherComponent),
  },
  {
    path: 'student',
    loadComponent: () =>
      import('./student/student.component').then((c) => c.StudentComponent),
  },
  {
    path: 'school',
    loadComponent: () =>
      import('./school/school.component').then((c) => c.SchoolComponent),
  },
];
