import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { TodoService } from './services/todo.service';
import { of } from 'rxjs';
import { Todo } from './model/todo';

describe('AppComponent', () => {
  let component: AppComponent;
  let todoService: TodoService;

  const mockTodos: Todo[] = [
    { id: 1, title: 'Todo 1', body: 'Body 1', userId: 1 },
    { id: 2, title: 'Todo 2', body: 'Body 2', userId: 2 },
  ];

  const updatedTodo: Todo = { id: 1, title: 'Updated Todo 1', body: 'Body 1', userId: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [TodoService],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
  });

  it('should fetch todos on initialization', () => {
    spyOn(todoService, 'getTodos').and.returnValue(of(mockTodos));

    // Initialize the component
    component.ngOnInit();

    // Expect todos to be set correctly
    expect(component.todos()).toEqual(mockTodos);
    expect(todoService.getTodos).toHaveBeenCalled();
  });

  it('should update a todo item without mutating the original array', () => {
    spyOn(todoService, 'updateTodo').and.returnValue(of(updatedTodo));

    // Set initial todos
    component.todos.set(mockTodos);

    // Call update on the first todo
    component.update(mockTodos[0]);

    // Check that the todoService was called with the correct todo
    expect(todoService.updateTodo).toHaveBeenCalledWith(mockTodos[0]);

    // Check that the todos were updated properly
    const updatedList = component.todos();
    expect(updatedList[0]).toEqual(updatedTodo);
    expect(updatedList[1]).toEqual(mockTodos[1]); // Other todos should remain unchanged
  });

  it('should not mutate the original todo list when updating', () => {
    spyOn(todoService, 'updateTodo').and.returnValue(of(updatedTodo));

    // Set initial todos
    const originalTodos = [...mockTodos];
    component.todos.set(mockTodos);

    // Call update
    component.update(mockTodos[0]);

    // Ensure the original todos list is not mutated
    expect(component.todos()).not.toBe(originalTodos);
    expect(component.todos()[0]).not.toBe(originalTodos[0]);
  });
});
