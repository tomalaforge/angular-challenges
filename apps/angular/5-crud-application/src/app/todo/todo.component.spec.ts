import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom, map, of, Subject } from 'rxjs';
import { todo } from '../todo/todo.model';
import { TodoComponent } from './todo.component';
import { ServiceTodo } from './todo.service';

describe('TodoComponent', () => {
  let fixture: ComponentFixture<TodoComponent>;
  let component: TodoComponent;
  let todosSubject: Subject<todo[]>;

  // Mock data for todos
  const todosMock: todo[] = [
    { todo: 1, id: 1, title: 'First', userId: 1, body: 'First todo' },
    { todo: 2, id: 2, title: 'Second', userId: 1, body: 'Second todo' },
  ];
  // Mock implementation of ServiceTodo
  const serviceMock = {
    getTodos: jest.fn(() => todosSubject.asObservable()),
    updateTodo: jest
      .fn()
      .mockImplementation((t: todo) =>
        of({ ...t, title: t.title + ' Updated' }),
      ),
    deleteTodo: jest.fn().mockReturnValue(of(null)),
  };

  beforeEach(async () => {
    todosSubject = new Subject<todo[]>();
    await TestBed.configureTestingModule({
      imports: [TodoComponent, MatProgressSpinnerModule],
      providers: [{ provide: ServiceTodo, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
  });
  // ---- Test 1: spinner is shown while loading ----
  it('should show spinner while loading', () => {
    fixture.detectChanges(); // triggers async pipe

    const spinner = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinner).toBeTruthy();
  });
  // ---- Test 2: todos are loaded after init ----
  it('should load todos on init', async () => {
    fixture.detectChanges();

    todosSubject.next(todosMock); // now resolve the data
    await fixture.whenStable();
    fixture.detectChanges();

    const todosLength = await firstValueFrom(
      component.todos$.pipe(map((todos) => todos.length)),
    );
    expect(todosLength).toBe(2);

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('First');
    expect(text).toContain('Second');
  });
  // ---- Test 3: todo is removed ----
  it('should remove todo after delete', async () => {
    fixture.detectChanges();

    todosSubject.next(todosMock); // resolve the data first
    await fixture.whenStable();
    fixture.detectChanges();

    const firstTodo = (await firstValueFrom(component.todos$))[0];
    component.delete(firstTodo);
    fixture.detectChanges();

    const todosLength = await firstValueFrom(
      component.todos$.pipe(map((todos) => todos.length)),
    );
    expect(todosLength).toBe(1);
    expect(
      (await firstValueFrom(component.todos$)).find(
        (t) => t.id === firstTodo.id,
      ),
    ).toBeUndefined();
    expect(serviceMock.deleteTodo).toHaveBeenCalledWith(firstTodo);
  });
});
