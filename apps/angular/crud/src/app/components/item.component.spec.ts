import { CommonModule } from '@angular/common';
import { ItemComponent } from './item.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Todo } from '../model/todo.interface';

describe('VersionsListComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ItemComponent],
    });

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show item title when item set', () => {
    const mockItem = getMockTodo();
    component.item = mockItem;
    fixture.detectChanges();

    const appItem: HTMLElement = fixture.nativeElement;
    const title = appItem.querySelector('[aria-label="title"]');

    expect(title?.textContent).toContain(mockItem.title);
  });

  it('should have disabled buttons when item in disabledTodosIds', () => {
    const mockItem = getMockTodo();
    component.item = mockItem;
    component.disabledTodosIds = [mockItem.id];
    fixture.detectChanges();

    const appItem: HTMLElement = fixture.nativeElement;
    const deleteButton: HTMLButtonElement | null = appItem.querySelector(
      '[aria-label="delete button"]'
    );
    const updateButton: HTMLButtonElement | null = appItem.querySelector(
      '[aria-label="update button"]'
    );

    expect(deleteButton?.disabled).toBeTruthy();
    expect(updateButton?.disabled).toBeTruthy();
  });
});

function getMockTodo() {
  const mockItem: Todo = {
    id: 1,
    title: 'test',
    completed: false,
    userId: 1,
  };

  return mockItem;
}
