import { ComponentFixture, TestBed } from '@angular/core/testing';

import { randText } from '@ngneat/falso';
import { of } from 'rxjs';
import { ItemComponent } from './item.component';
import { ITodo } from './todo.interface';
import { TodoService } from './todo.service';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let todoService: TodoService;
  const mockTodo: ITodo = {
    userId: 1,
    id: 1,
    title: 'sample todo title',
    completed: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent],
      providers: [TodoService],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateTodo on update and emit event', () => {
    spyOn(todoService, 'updateTodo').and.returnValue(
      of({ ...mockTodo, title: randText() }),
    );
    spyOn(component.todoUpdated, 'emit');

    component.onUpdate();

    expect(todoService.updateTodo).toHaveBeenCalledWith(
      jasmine.objectContaining({ id: mockTodo.id }),
    );
    expect(component.todoUpdated.emit).toHaveBeenCalled();
  });

  it('should call deleteTodo on delete and emit event', () => {
    spyOn(todoService, 'deleteTodo').and.returnValue(of(undefined));
    spyOn(component.todoDeleted, 'emit');

    component.onDelete();

    expect(todoService.deleteTodo).toHaveBeenCalledWith(mockTodo.id);
    expect(component.todoDeleted.emit).toHaveBeenCalledWith(mockTodo.id);
  });
});
