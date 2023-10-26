import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodosComponent } from './todos.component';
import { TodoService } from '../../data-access/todo.service';
import { of } from 'rxjs';

describe('TodoListComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, TodosComponent], // Mock HttpClient
    });

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('should render todos', () => {
    // Mock the data that would be returned by the HTTP request
    const mockTodos = [
      { id: 1, text: 'Todo 1' },
      { id: 2, text: 'Todo 2' },
    ];

    // Simulate the HTTP response by providing the mock data to your service
    const todoService = TestBed.inject(TodoService);
    jest.spyOn(todoService, 'get').mockReturnValue(of(mockTodos).subscribe());

    // Trigger ngOnInit to fetch and populate todos
    fixture.detectChanges();

    //used set timeout to wait for rendering after subscription
    setTimeout(() => {
      // Check that the todos are rendered
      const todoElements =
        fixture.nativeElement.querySelectorAll('.single-todo');
      expect(todoElements.length).toBe(2);

      // You can also assert the text content of individual todo items
      expect(todoElements[0].textContent).toContain('Todo 1');
      expect(todoElements[1].textContent).toContain('Todo 2');
    }, 3000);
  });
});
