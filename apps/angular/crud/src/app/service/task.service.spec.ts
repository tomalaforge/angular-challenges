import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Task } from '../model/task';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all tasks', () => {
    const dummyTasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' },
    ];

    service.getAllData().subscribe((tasks) => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(dummyTasks);
    });

    const req = httpMock.expectOne(
      'https://jsonplaceholder.typicode.com/todos',
    );
    expect(req.request.method).toBe('GET');
    req.flush(dummyTasks);
  });

  it('should put a task', () => {
    const dummyTask: Task = {
      userId: 1,
      id: 1,
      title: 'Task 1',
      completed: true,
    };

    service.putEntity(dummyTask).subscribe((task) => {
      expect(task).toEqual(dummyTask);
    });

    const req = httpMock.expectOne(
      `https://jsonplaceholder.typicode.com/todos/${dummyTask.id}`,
    );
    expect(req.request.method).toBe('PUT');
    req.flush(dummyTask);
  });

  it('should delete a task', () => {
    const dummyTask: Task = {
      userId: 1,
      id: 1,
      title: 'Task 1',
      completed: true,
    };

    service.delEntity(dummyTask).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `https://jsonplaceholder.typicode.com/todos/${dummyTask.id}`,
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
