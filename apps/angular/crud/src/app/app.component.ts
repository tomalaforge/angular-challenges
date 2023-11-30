import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { TODOTYPE } from './app.model';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo.id)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos$!: Observable<TODOTYPE[]>;

  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.appService.getAllTodos().subscribe();
    this.todos$ = this.appService.todos$;
  }

  update(todo: TODOTYPE) {
    this.appService.update(todo);
  }
  delete(id: number) {
    this.appService.delete(id);
  }
}
