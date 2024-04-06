import { HttpClient, HttpHandler } from '@angular/common/http';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { TodoComponent } from './todo.component';
import { TodoStore } from './todo.store';

/**
 * Provide the actual instance of TodoStore,
 * can be improved further by providing a mock instance and
 * implementing isolated tests for the store service itself
 */
describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [HttpHandler, HttpClient, TodoStore],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(TodoStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos', () => {
    store.todoEntities = signal([{ id: 1 }]);
    fixture.detectChanges();

    const appListItems = fixture.debugElement.queryAll(
      By.directive(ListItemComponent),
    )[0]?.componentInstance;
    const noTodosAvailable = fixture.debugElement.query(
      By.css('#no-todos-available'),
    );
    expect(appListItems).toBeDefined();
    expect(noTodosAvailable).toBeNull();
  });

  it('should display "There are no todos available." when no todos exist', () => {
    store.todoEntities = signal([]);
    fixture.detectChanges();

    const appListItems = fixture.debugElement.queryAll(
      By.directive(ListItemComponent),
    )[0]?.componentInstance;
    const noTodosAvailable = fixture.debugElement.query(
      By.css('#no-todos-available'),
    );
    expect(appListItems).not.toBeDefined();
    expect(noTodosAvailable).toBeDefined();
  });
});
