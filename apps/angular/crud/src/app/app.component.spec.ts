import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Todo } from './models';

describe('app component', () => {
  const mockTodos: Todo[] = Todo.mockData();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
    }).compileComponents();
  });

  it('should load all todos', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Act
    app.store.setTodos(mockTodos);

    // Arrange
    expect(app.store.todos()).toBeDefined();
    expect(app.store.todos()!.length).toBe(mockTodos.length);
    done();
  });

  it('should update one todo', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Act
    app.store.setTodos(mockTodos);
    const changeTodo = Todo.mockData()[0];
    changeTodo.title = 'test change';
    app.store.updateTodo(changeTodo);
    // TODO: open dialog and spy on dialog closeAll(), then expect closeAll() to be called in test
    // const openDialogSpy = jest.spyOn(app.dialog, 'open');

    // Assert
    const todos = app.store.todos();
    const updatedTodo = todos!.find((t) => t.id == changeTodo.id);

    // expect(app.updateTodo).toBeCalledWith(changeTodo); // TODO: same like todo below
    expect(Todo.isSame(Todo.mockData()[0], updatedTodo!)).toBe(false);
    done();
  });

  it('should delete one todo', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const mockTodos: Todo[] = Todo.mockData();
    app.store.setTodos(mockTodos);

    // Act
    const deleteTodo = Todo.mockData()[3];
    app.store.deleteTodo(deleteTodo);

    // Assert
    // TODO: not working yet, Matcher error: received value must be a mock or spy function
    // expect(app.removeArrayItem).toBeCalledWith(mockTodos, deleteTodo);

    const todos = app.store.todos();
    const findDeletedTodo = todos!.find((t) => t.id === deleteTodo.id);
    expect(findDeletedTodo).toBeFalsy();
    expect(todos!.length).toBe(Todo.mockData().length - 1);
    done();
  });
});
