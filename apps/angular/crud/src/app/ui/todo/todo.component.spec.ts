import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { LoaderService } from '../loader/loader.service';
import { TodoComponent } from './todo.component';

const mockStore = {
  dispatch: jest.fn(),
};

const mockLoaderService = {
  isLoading: jest.fn().mockReturnValue(false),
};

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: LoaderService, useValue: mockLoaderService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    component.todo = { id: 1, userId: 1, title: 'Test todo', completed: false };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
