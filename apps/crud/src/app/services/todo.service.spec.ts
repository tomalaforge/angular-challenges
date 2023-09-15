import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { TodoItem } from '../models/todo.model';
import { MockTodoApiService } from './mock-todo-api.service';
import { TodoApiService } from './todo-api.service';

const mockData: TodoItem[] = [
  {
    userId: 1,
    id: 1,
    title: 'title 1',
    completed: false,
    body: '',
  },
  {
    userId: 1,
    id: 2,
    title: 'title 2',
    completed: false,
    body: '',
  },
  {
    userId: 1,
    id: 3,
    title: 'title 3',
    completed: false,
    body: '',
  },
  {
    userId: 1,
    id: 4,
    title: 'et porro tempora',
    completed: true,
    body: '',
  },
];

describe('todo service', () => {
  beforeEach(() => {
    const mockTodoApiService = new MockTodoApiService(mockData);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TodoApiService,
          useValue: mockTodoApiService,
        },
        TodoService,
      ],
    });
  });

  it('should load todos', (done) => {
    const service = TestBed.inject(TodoService);

    service.loadTodos();

    service.viewModel$.subscribe((model) => {
      expect(model.todos.length).toBe(mockData.length);
      done();
    });
  });

  it('should update todo', (done) => {
    const service = TestBed.inject(TodoService);
    service.loadTodos();
    const updatingTodo: TodoItem = {
      id: 2,
      body: 'zzz',
      title: 'Updated title',
      completed: true,
      userId: 1,
    };

    service.updateTodo(updatingTodo);

    service.viewModel$.subscribe((model) => {
      const updatedItem = model.todos.find((t) => t.id == updatingTodo.id);
      expect(updatedItem).toBeTruthy();
      expect(updatedItem?.body).toBe(updatingTodo.body);
      expect(updatedItem?.completed).toBe(updatingTodo.completed);

      done();
    });
  });

  it('should delete todo', (done) => {
    const service = TestBed.inject(TodoService);
    service.loadTodos();
    const deletingTodo = {
      userId: 1,
      id: 2,
      title: 'title 2',
      completed: false,
      body: '',
    };

    service.deleteTodo(deletingTodo);

    service.viewModel$.subscribe((model) => {
      const deletedTodo = model.todos.find((t) => t.id === deletingTodo.id);
      expect(deletedTodo).toBeUndefined();
      done();
    });
  });
});
