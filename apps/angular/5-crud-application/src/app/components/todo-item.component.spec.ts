import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let todoService: jest.Mocked<TodoService>;

  const mockTodo = {
    id: 1,
    title: 'Test Todo',
    completed: false,
    userId: 1,
  };

  beforeEach(async () => {
    const spy = {
      updateTodo: jest.fn().mockReturnValue(of(mockTodo)),
      deleteTodo: jest.fn().mockReturnValue(of(void 0)),
      todos: jest.fn(),
      loading: jest.fn(),
      error: jest.fn(),
      getTodos: jest.fn(),
    } as unknown as jest.Mocked<TodoService>;

    await TestBed.configureTestingModule({
      imports: [TodoItemComponent, MatProgressSpinnerModule],
      providers: [{ provide: TodoService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = mockTodo;
    todoService = TestBed.inject(TodoService) as jest.Mocked<TodoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show processing state during update', fakeAsync(() => {
    component.updateTodo();
    expect(component.processing).toBe(true);
    tick();
    expect(component.processing).toBe(false);
  }));

  it('should show processing state during delete', fakeAsync(() => {
    component.deleteTodo();
    expect(component.processing).toBe(true);
    tick();
    expect(component.processing).toBe(false);
  }));

  it('should call service methods', () => {
    component.updateTodo();
    expect(todoService.updateTodo).toHaveBeenCalled();

    component.deleteTodo();
    expect(todoService.deleteTodo).toHaveBeenCalled();
  });
});
