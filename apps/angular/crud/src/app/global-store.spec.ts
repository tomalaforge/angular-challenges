import { Signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EntityId, EntityMap } from '@ngrx/signals/entities';
import { of } from 'rxjs';
import { TodosStore } from './global-store';
import { Todo, TodoState } from './todo.model';
import { TodoService } from './todo.service';

describe('TodosStore', () => {
  let store: {
    state: Signal<TodoState>;
    disabled: Signal<boolean>;
    entityMap: Signal<EntityMap<Todo>>;
    ids: Signal<EntityId[]>;
    entities: Signal<Todo[]>;
    loadAll: () => Promise<void>;
    updateItem: (todo: Todo) => void;
    deleteItem: (id: number) => void;
    resetState: () => void;
    disableButtons: () => void;
    enableButtons: () => void;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
        TodosStore,
      ],
    });
    store = TestBed.inject(TodosStore);
  });

  describe('loadAll', () => {
    beforeEach(async () => {
      await store.loadAll();
    });
    test('size should be 2', () => {
      const entities = store.entities();
      const length = entities.length;
      expect(length).toEqual(2);
    });

    test('ids should be 1, 2', () => {
      const entities = store.entities();

      const id1 = entities[0].id;
      const id2 = entities[1].id;

      expect(id1).toEqual(1);
      expect(id2).toEqual(2);
    });
  });

  describe('updateItem', () => {
    beforeEach(async () => {
      await store.loadAll();
    });

    test('should first todo title be fugiat veniam minus', () => {
      const userId = 1;
      const updateItem: Todo = {
        userId: userId,
        id: 1,
        title: 'fugiat veniam minus',
        completed: false,
      };

      store.updateItem(updateItem);

      const firstTitle = store.entityMap()[userId].title;
      expect(firstTitle).toBe('fugiat veniam minus');
    });

    test('should second todo title be delectus aut autem', () => {
      const userId = 2;
      const updateItem: Todo = {
        userId: userId,
        id: 2,
        title: 'delectus aut autem',
        completed: false,
      };

      store.updateItem(updateItem);

      const secondTitle = store.entityMap()[userId].title;
      expect(secondTitle).toBe('delectus aut autem');
    });
  });

  describe('deleteItem', () => {
    test('should first todo not be found', async () => {
      await store.loadAll();
      const deleteTodoId: number = 1;

      store.deleteItem(deleteTodoId);

      const firstTodo = store.entityMap()[1];
      expect(firstTodo).toBeUndefined();
    });
  });
});

const allTodos = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
];

const mockTodoService = {
  getTodos: () => of(allTodos),
  update: () => of({}),
  delete: () => of({}),
};
