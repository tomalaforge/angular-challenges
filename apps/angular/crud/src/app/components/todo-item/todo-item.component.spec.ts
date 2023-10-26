import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { ITodo } from '../../models/todo.model';

describe('TodoItemComponent', () => {
  let fixture: ComponentFixture<TodoItemComponent>;
  let component: TodoItemComponent;
  const mockTodoItem: ITodo = {
    title: 'Original Title',
    id: 1,
    disabled: false,
    userId: 2,
    completed: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    });

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todoItem = mockTodoItem;

    fixture.detectChanges();
  });

  it('should update the title on update button click', () => {
    const button =
      fixture.debugElement.nativeElement.querySelector('.update-btn');

    expect(mockTodoItem.title).toBe('Original Title');

    button.click();
    fixture.detectChanges();

    setTimeout(() => {
      expect(mockTodoItem.title).toBe('New Title');
    }, 2000);
  });
});
