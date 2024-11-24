import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Todo } from '../state/todo.model';
import { ItemComponent } from './item.component';

const MockTodo: Todo = {
  body: 'foo',
  id: 0,
  userId: 0,
  title: 'bar',
};

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('todo', MockTodo);
    fixture.detectChanges();
  });

  it('should render the component', () => {
    expect(component).toBeDefined();
  });

  it('should contain the title', async () => {
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector('div.list-item');
    expect(div.textContent).toContain(MockTodo.title);
  });

  it('should emit update event', () => {
    const updateSpy = jest.spyOn(component.update, 'emit');
    component.onAction('update');
    expect(updateSpy).toHaveBeenCalled();
  });
});
