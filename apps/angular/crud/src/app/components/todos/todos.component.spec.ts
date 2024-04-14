// todos.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from '../../interfaces/todo.interface';
import { OperationType } from '../../store/enums/actions.enum';
import { TodoStore } from '../../store/todo/todo-store';
import { TodosComponent } from './todos.component';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  const todoStoreMock = {
    query: {
      isFetched: jest.fn(),
      data: jest.fn(),
      error: jest.fn(),
    },
    mutation: {
      mutate: jest.fn(),
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: TodoStore, useValue: todoStoreMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call update method with correct payload', () => {
    const todo: Todo = { id: 1, title: 'Todo 1' };
    component.update(todo);
    expect(todoStoreMock.mutation.mutate).toHaveBeenCalledWith({
      type: OperationType.UPDATE,
      payload: { ...todo, title: expect.any(String) },
    });
  });

  it('should call delete method with correct payload', () => {
    const todoId = 1;
    component.delete(todoId);
    expect(todoStoreMock.mutation.mutate).toHaveBeenCalledWith({
      type: OperationType.DELETE,
      payload: todoId,
    });
  });
});
