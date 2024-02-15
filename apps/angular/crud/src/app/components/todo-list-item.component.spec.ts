import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Todo } from '../models';
import { TodoService } from '../services';
import { TodoListItemComponent } from './todo-list-item.component';

describe('todo-list-item component', () => {
  const mockTodos: Todo[] = Todo.mockData();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TodoService],
    }).compileComponents();
  });

  it('should update one todo', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(TodoListItemComponent);
    const app = fixture.componentInstance;
    const service = TestBed.inject(TodoService);

    // Act
    service.todos.set(mockTodos);
    const changeTodo = Todo.mockData()[0];
    changeTodo.title = 'test change';
    app.updateTodo(changeTodo);
    // TODO: open dialog and spy on dialog closeAll(), then expect closeAll() to be called in test
    // const openDialogSpy = jest.spyOn(app.dialog, 'open');

    // Assert
    const updatedTodo = app.todos().find((t) => t.id == changeTodo.id);

    // expect(app.updateTodo).toBeCalledWith(changeTodo); // TODO: same like todo below
    expect(Todo.isSame(changeTodo, updatedTodo!)).toBe(false);
    done();
  });

  it('should delete one todo', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(TodoListItemComponent);
    const app = fixture.componentInstance;
    const mockTodos: Todo[] = Todo.mockData();
    app.todos.set(mockTodos);

    // Act
    const deleteTodo = Todo.mockData()[3];
    app.removeArrayItem(mockTodos, deleteTodo);

    // Assert
    // TODO: not working yet, Matcher error: received value must be a mock or spy function
    // expect(app.removeArrayItem).toBeCalledWith(mockTodos, deleteTodo);

    const todos = app.todos();
    const findDeletedTodo = todos.find((t) => t.id === deleteTodo.id);
    expect(findDeletedTodo).toBeFalsy();
    expect(todos.length).toBe(Todo.mockData().length - 1);
    done();
  });
});
