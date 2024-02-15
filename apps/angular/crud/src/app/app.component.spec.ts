import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Todo } from './models';
import { TodoService } from './services';

describe('app component', () => {
  const mockTodos: Todo[] = Todo.mockData();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [TodoService],
    }).compileComponents();
  });

  it('should load all todos', (done) => {
    // Arrange
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Act
    app.todos.set(mockTodos);

    // Arrange
    expect(app.todos().length).toBe(mockTodos.length);
    done();
  });
});
