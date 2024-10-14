import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CrudSpecialService } from '../services/crud-special.service';

const mockData = [
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
  {
    userId: 1,
    id: 3,
    title: 'fugiat veniam minus',
    completed: false,
  },
  {
    userId: 1,
    id: 4,
    title: 'et porro tempora',
    completed: true,
  },
  {
    userId: 1,
    id: 5,
    title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
    completed: false,
  },
];

const mockUpdate = {
  todo: 1,
  title: 'Facilis k.',
  body: {
    userId: 1,
    id: 1,
    title: 'Facilis k.',
    completed: false,
  },
  userId: 1,
  id: 1,
};

describe('CrudSpecialService', () => {
  let service: CrudSpecialService;
  let testingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CrudSpecialService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll request test', (done) => {
    service.getAll$.subscribe((value) => {
      expect(value).toBe(mockData);
      done();
    });
    const requests = testingController.match(
      'https://jsonplaceholder.typicode.com/todos',
    );
    requests[1].flush(mockData);
  });

  it('update request test', (done) => {
    const alteredData = mockUpdate.body;
    service.updateTodo(alteredData).subscribe((value) => {
      expect(value.title).toBe(alteredData.title);
      done();
    });
    const requests = testingController.match(
      `https://jsonplaceholder.typicode.com/todos/${alteredData.id}`,
    );
    requests[0].flush(mockUpdate);
  });
});
