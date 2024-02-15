import { Todo } from './todo.model';

describe('Todo isSame method', () => {
  const mockTodos: Todo[] = Todo.mockData();

  it('should return true if 2 todos are the same', (done) => {
    // Arrange
    const mockTodo1 = mockTodos[2];
    const mockTodo2 = mockTodos[2];

    // Act
    const isSameResult = Todo.isSame(mockTodo1, mockTodo2);

    // Arrange
    // expect(Todo.isSame).toBeCalledWith(mockTodo1, mockTodo2);
    expect(isSameResult).toBe(true);
    done();
  });

  it('should return false if 2 todos are not the same', (done) => {
    // Arrange
    const mockTodo1 = mockTodos[2];
    const mockTodo2 = mockTodos[5];

    // Act
    const isSameResult = Todo.isSame(mockTodo1, mockTodo2);

    // Arrange
    // expect(Todo.isSame).toBeCalledWith(mockTodo1, mockTodo2);
    expect(isSameResult).toBe(false);
    done();
  });
});
