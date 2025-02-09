import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from '../../models/todo.model';
import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  });

  it('should render the todo title', () => {
    const mockTodo: Todo = {
      id: 1,
      title: 'Test Todo',
      completed: false,
      userId: 1,
    };
    component.todo = mockTodo;

    fixture.detectChanges();

    const todoText = fixture.nativeElement.querySelector('span').textContent;
    expect(todoText).toContain('Test Todo');
  });
});
