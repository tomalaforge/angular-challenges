import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { of } from 'rxjs';
import { RestService } from '../rest.service';
import { StateService, Todo } from './state.service';

const MockData: Todo[] = [
  {
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  },
  {
    id: 2,
    title: 'foo',
    body: 'bar',
    userId: 1,
  },
];

describe('StateService', () => {
  let service: StateService;
  let restService: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StateService,
        {
          provide: RestService,
          useValue: {
            fetchData: () => of(MockData),
            update: (todo: Todo) => of(todo),
            delete: (todo: Todo) => of(todo),
          },
        },
      ],
    });
    service = TestBed.inject(StateService);
    restService = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data', fakeAsync(() => {
    service.fetchData();
    tick(1000);
    expect(service.todos()).toEqual(MockData);
    expect(service.isLoading()).toBe(false);
  }));

  it('should update todo', fakeAsync(() => {
    service.todos.set(MockData);
    const updatedTodo = { ...MockData[0], title: 'new title' };
    const restServiceSpy = jest.spyOn(restService, 'update');
    service.update(updatedTodo);
    tick();
    expect(restServiceSpy).toHaveBeenCalledWith(updatedTodo);
    expect(service.todos()[0]).toEqual(updatedTodo);
  }));

  it('should delete todo', fakeAsync(() => {
    service.todos.set(MockData);
    const restServiceSpy = jest.spyOn(restService, 'delete');
    service.delete(MockData[0]);
    tick();
    expect(restServiceSpy).toHaveBeenCalledWith(MockData[0]);
    expect(service.todos()).not.toContain(MockData[0]);
  }));
});
