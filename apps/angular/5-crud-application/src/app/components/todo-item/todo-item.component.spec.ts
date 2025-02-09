import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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

  it('should emit update event on clicking update button', () => {
    const mockTodo: Todo = {
      id: 1,
      title: 'Test Todo',
      completed: false,
      userId: 1,
    };
    component.todo = mockTodo;
    fixture.detectChanges();

    jest.spyOn(component.update, 'emit');

    const button = fixture.debugElement.query(By.css('button:nth-of-type(1)'));
    button.triggerEventHandler('click', null);

    expect(component.update.emit).toHaveBeenCalledWith(mockTodo);
  });
});
