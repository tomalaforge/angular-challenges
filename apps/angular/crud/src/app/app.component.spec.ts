import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { TodosStore } from './data-access/todos.store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const mockMoviesStore: jest.Mocked<TodosStore> = {
    load: jest.fn(),
    select: jest.fn(),
    update: jest.fn(),
  } as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppComponent, MatProgressSpinnerModule, CommonModule],
    });

    TestBed.overrideProvider(TodosStore, { useValue: mockMoviesStore });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should call todosStore.load() on ngOnInit', () => {
    fixture.detectChanges(); // Trigger component initialization
    expect(mockMoviesStore.load).toHaveBeenCalled();
  });
  it('should call todosStore.upload on handleUpdate', () => {
    component.handleUpdate({
      id: 1,
      userId: 1,
      title: 'test',
      completed: false,
    });
    expect(mockMoviesStore.update).toHaveBeenCalled();
  });
});
