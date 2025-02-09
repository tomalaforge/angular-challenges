import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component';
import { Todo } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodoListComponent,
        MatProgressSpinnerModule,
        TodoItemComponent,
        HttpClientTestingModule,
      ],
      providers: [TodoService],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    jest.spyOn(todoService, 'getTodos').mockReturnValue(of([]));
  });

  it('should call get todos on initialization', () => {
    const mockTodos: Todo[] = [
      { id: 1, title: 'Test Todo', completed: false, userId: 1 },
    ];
    jest.spyOn(todoService, 'getTodos').mockReturnValue(of(mockTodos));

    fixture.detectChanges();

    expect(todoService.getTodos).toHaveBeenCalled();
  });
});
