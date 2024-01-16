import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, createMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TodoHttpService } from '../http/todo-http.service';
import { TodoItem } from '../models/todo';
import { AppState, AppStore } from '../stores/app.store';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let el: HTMLElement;
  const mockStore: MockStore<Partial<AppState>> = createMockStore({
    initialState: { todos: [], isAppProcessing: false },
  });
  const todoItems: TodoItem[] = [
    { id: 1, userId: 1, body: 'body1', title: 'title1' },
    { id: 2, userId: 2, body: 'body2', title: 'title3' },
  ];
  const mockService: Partial<TodoHttpService> = {
    getTodoList(): Observable<TodoItem[]> {
      return of(todoItems);
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AppStore, useValue: mockStore },
        { provide: TodoHttpService, useValue: mockService, deps: HttpClient },
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    el = fixture.nativeElement;
  });

  it('should start with an empty array', () => {
    const todoEls = el.querySelectorAll('.todo-item');
    expect(todoEls.length).toBe(0);
  });

  it('should render a list after ngOnInit', () => {
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    const todoEls = el.querySelectorAll('.todo-item');
    expect(todoEls.length).toBe(todoItems.length);
  });
});
