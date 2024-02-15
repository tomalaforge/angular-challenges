import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Todo } from './models';
import { TodoService } from './services';

describe('app component', () => {
  const mockTodos: Todo[] = Todo.mockData();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TodoService],
    }).compileComponents();
  });

  it('should load all todos', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const service = TestBed.inject(TodoService);

    // Act
    service.todos.set(mockTodos);

    // Arrange
    expect(app.todos().length).toBe(mockTodos.length);
    done();
  });

  it('should update one todo', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const service = TestBed.inject(TodoService);

    // Act
    service.todos.set(mockTodos);
    const changeTodo = Todo.mockData()[0];
    changeTodo.title = 'test change';
    app.updateTodo(changeTodo);
    // const openDialogSpy = jest.spyOn(app.dialog, 'open');

    // Assert
    const updatedTodo = app.todos().find((t) => t.id == changeTodo.id);

    // expect(app.updateTodo).toBeCalledWith(changeTodo); // TODO: same like todo below
    expect(Todo.isSame(changeTodo, updatedTodo!)).toBe(false);
    done();
  });

  it('should delete one todo', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const mockTodos: Todo[] = Todo.mockData();
    app.todos.set(mockTodos);

    // Act
    const deleteTodo = Todo.mockData()[3];
    app.removeArrayItem(mockTodos, deleteTodo);

    // Assert
    // expect(app.removeArrayItem).toBeCalledWith(mockTodos, deleteTodo);
    // TODO: not working yet, Matcher error: received value must be a mock or spy function
    // Received has type:  function | Received has value: [Function removeArrayItem]

    const todos = app.todos();
    const findDeletedTodo = todos.find((t) => t.id === deleteTodo.id);
    expect(findDeletedTodo).toBeFalsy();
    expect(todos.length).toBe(Todo.mockData().length - 1);
    done();
  });
});
