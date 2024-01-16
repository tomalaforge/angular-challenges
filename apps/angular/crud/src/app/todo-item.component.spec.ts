import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import spyOn = jest.spyOn;

describe('TodoItemComponent', () => {
  let fixture: ComponentFixture<TodoItemComponent>;
  let comp: TodoItemComponent;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoItemComponent],
    });
    fixture = TestBed.createComponent(TodoItemComponent);
    comp = fixture.componentInstance;
    el = fixture.nativeElement;
  });

  it('should have initial state', () => {
    expect(comp).toBeTruthy();
    expect(comp.title).toBeUndefined();
    expect(comp.isProcessing).toBe(false);

    fixture.detectChanges();

    expect(el.querySelector('.todo-content .title')).toBeTruthy();
  });

  it('should accept input correctly', () => {
    const mockTitle = 'mock title';
    comp.isProcessing = true;
    comp.title = mockTitle;
    fixture.detectChanges();

    expect(el.querySelector('.todo-content .title')).toBeNull();

    comp.isProcessing = false;
    fixture.detectChanges();

    expect(el.querySelector('.todo-content .title')).toBeTruthy(); // failed
    expect(el.querySelector('.todo-content .title')?.textContent).toBe(
      mockTitle,
    );
  });

  it('should trigger update on click', () => {
    const spy = spyOn(comp.update, 'emit');

    const button = el.querySelector('.update-btn');
    button?.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });

  it('should trigger delete on click', () => {
    const spy = spyOn(comp.delete, 'emit');

    const button = el.querySelector('.delete-btn');
    button?.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalled();
  });
});
