// i need test file for this component

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Todo } from './models/todo.interface';
import { TodoService } from './services/todo.service';

const todos: Todo[] = [
  { id: 1, title: 'Todo 1', userId: 1, completed: false },
  { id: 2, title: 'Todo 2', userId: 2, completed: false },
];

const mockTodoService = {
  getTodos: jest.fn().mockReturnValue(of(todos)),
  deleteTodo: jest.fn().mockReturnValue(of(todos[0])),
  updateTodo: jest.fn().mockReturnValue(of(todos[0])),
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoService: TodoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        MatProgressSpinnerModule,
        HttpClientTestingModule,
      ],
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get todos', () => {
    component.ngOnInit();

    expect(component.todos()).toEqual(todos);
  });

  it('should delete todo', () => {
    jest.spyOn(todoService, 'deleteTodo');

    component.delete(1);

    expect(component.todos().length).toBe(1);
  });

  it('should update todo', () => {
    jest.spyOn(todoService, 'updateTodo');

    component.update(todos[0]);

    expect(component.todos()[0].title).toBe(todos[0].title);
  });
});
