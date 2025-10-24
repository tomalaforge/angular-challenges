import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of, Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { Todo } from './todo';
import { TodoService } from './todo.service';

const todos: Todo[] = [
  {
    id: 1,
    title: 'Todo 1',
    completed: false,
    userId: 0,
  },
  {
    id: 2,
    title: 'Todo 2',
    completed: true,
    userId: 0,
  },
];

describe('AppComponent', () => {
  let updateTodoMock: jest.Mock;
  let deleteTodoMock: jest.Mock;

  beforeEach(async () => {
    updateTodoMock = jest.fn();
    deleteTodoMock = jest.fn();

    const mockTodoService: Partial<TodoService> = {
      getTodos: jest.fn().mockReturnValue(of(todos)),
      updateTodo: updateTodoMock,
      deleteTodo: deleteTodoMock,
    };
    await render(AppComponent, {
      providers: [{ provide: TodoService, useValue: mockTodoService }],
    });
  });
  it('should renders todos', async () => {
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getAllByTestId('todo-item').length).toBe(2);
  });

  it('should update a todo', async () => {
    const update$ = new Subject<Todo>();
    updateTodoMock.mockReturnValue(update$);

    const firstRow = (await screen.findAllByTestId('todo-item')).find((el) =>
      el.textContent?.includes('Todo 1'),
    )!;
    const rowContainer = firstRow.closest('.container')! as HTMLElement;

    await userEvent.click(within(rowContainer).getByTestId('update-btn'));

    expect(
      screen.getByTestId(`todo-spinner-${todos[0].id}`),
    ).toBeInTheDocument();
    expect(updateTodoMock).toHaveBeenCalledWith(todos[0]);
    expect(within(rowContainer).getByTestId('update-btn')).toBeDisabled();
    expect(within(rowContainer).getByTestId('delete-btn')).toBeDisabled();

    update$.next({ ...todos[0], title: 'Todo 1 (updated)' });
    update$.complete();

    expect(await screen.findByText('Todo 1 (updated)')).toBeInTheDocument();
    expect(screen.queryByTestId('todo-spinner-1')).not.toBeInTheDocument();
    expect(within(rowContainer).getByTestId('update-btn')).not.toBeDisabled();
    expect(within(rowContainer).getByTestId('delete-btn')).not.toBeDisabled();
  });

  it('should remove a todo', async () => {
    const delete$ = new Subject<void>();
    deleteTodoMock.mockReturnValue(delete$);

    const secondRow = (await screen.findAllByTestId('todo-item')).find((el) =>
      el.textContent?.includes('Todo 2'),
    )!;
    const rowContainer = secondRow.closest('.container')! as HTMLElement;

    await userEvent.click(within(rowContainer).getByTestId('delete-btn'));

    expect(
      screen.getByTestId(`todo-spinner-${todos[1].id}`),
    ).toBeInTheDocument();
    expect(deleteTodoMock).toHaveBeenCalledWith(todos[1].id);
    expect(within(rowContainer).getByTestId('update-btn')).toBeDisabled();
    expect(within(rowContainer).getByTestId('delete-btn')).toBeDisabled();

    delete$.next();
    delete$.complete();

    await waitForElementToBeRemoved(() => screen.getByTestId('todo-spinner-2'));
    expect(screen.getAllByTestId('todo-item').length).toBe(1);
  });
});
