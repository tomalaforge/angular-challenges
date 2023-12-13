import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Teacher } from '../model/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherStore {
  private teachers = new BehaviorSubject<Teacher[]>([]);

  public teachers$ = this.teachers.asObservable();

  public addAll(teachers: Teacher[]): void {
    this.teachers.next(teachers);
  }

  public addOne(teacher: Teacher): void {
    this.teachers.next([...this.teachers.value, teacher]);
  }

  public deleteOne(id: number): void {
    this.teachers.next(
      this.teachers.value.filter((t: Teacher): boolean => t.id !== id),
    );
  }
}
