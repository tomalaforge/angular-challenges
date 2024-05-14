import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { TodosStore } from './stores/todo.store';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todoStore.todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
    </div>
  `,
  styles: [],
  providers: [TodosStore],
})
export class AppComponent implements OnInit {
  readonly todoStore = inject(TodosStore);
  todos!: any[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http
    //   .get<any[]>('https://jsonplaceholder.typicode.com/todos')
    //   .subscribe((todos) => {
    //     this.todos = todos;
    //   });
  }

  // update(todo: any) {
  //   this.http
  //     .put<any>(
  //       `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
  //       JSON.stringify({
  //         todo: todo.id,
  //         title: randText(),
  //         body: todo.body,
  //         userId: todo.userId,
  //       }),
  //       {
  //         headers: {
  //           'Content-type': 'application/json; charset=UTF-8',
  //         },
  //       },
  //     )
  //     .subscribe((todoUpdated: any) => {
  //       this.todos[todoUpdated.id - 1] = todoUpdated;
  //     });
  // }
}
