import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODOTYPE } from './app.model';
import { randText } from '@ngneat/falso';
import { BehaviorSubject, tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogAnimationsProgressComponent } from './progress-dialog.component';

@Injectable({ providedIn: 'root' })
export class AppService {
  todoSubject = new BehaviorSubject<TODOTYPE[]>([]);
  todos$ = this.todoSubject.asObservable();
  public dialogRef!: MatDialogRef<DialogAnimationsProgressComponent>;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

  getAllTodos() {
    return this.http
      .get<TODOTYPE[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap((todos) => this.todoSubject.next(todos)));
  }

  update(todo: TODOTYPE) {
    this.openDialog();
    this.http
      .put<TODOTYPE>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe({
        next: (todoUpdate: TODOTYPE) => {
          this.todoSubject.next(
            this.todoSubject.value.map((t) =>
              t.id === todoUpdate.id ? todoUpdate : t,
            ),
          );
          this.closeDialog();
        },
        error: () => {
          this.closeDialog();
        },
      });
  }

  delete(id: number) {
    this.openDialog();
    this.http
      .delete<number>(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe({
        next: () => {
          this.todoSubject.next(
            this.todoSubject.value.filter((t) => t.id !== id),
          );
          this.closeDialog();
        },
        error: () => {
          this.closeDialog();
        },
      });
  }
  openDialog() {
    this.dialogRef = this.dialog.open(DialogAnimationsProgressComponent);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
