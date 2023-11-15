import { ToDoStore } from './store/to-do.store';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoComponent } from './to-do.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListComponent } from '../../shared/components/list/list.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ListItemComponent } from '../../shared/components/list-item/list-item.component';

type ToDoStoreMock = {
  setTodo: jest.Mock;
  deleteTodo: jest.Mock;
  updateTodo: jest.Mock;
  isLoading: jest.Mock;
  todo: jest.Mock;
};

describe('ToDoComponent', () => {
  let component: ToDoComponent;
  let fixture: ComponentFixture<ToDoComponent>;
  let toDoStoreMock: ToDoStoreMock;

  beforeEach(async () => {
    toDoStoreMock = {
      setTodo: jest.fn(),
      deleteTodo: jest.fn(),
      updateTodo: jest.fn(),
      isLoading: jest.fn(),
      todo: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ToDoComponent],
      providers: [
        { provide: ToDoStore, useValue: toDoStoreMock },
        { provide: HttpClient, useValue: null },
        provideHttpClient(),
        importProvidersFrom(MatButtonModule, MatProgressSpinnerModule),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component and call setTodo',  () => {
     component.ngOnInit();
    expect(toDoStoreMock.setTodo).toHaveBeenCalled();
  });

  it('should render todo items correctly', async () => {
    const mockToDoList = [
      {
        completed: false,
        id: 101,
        title: 'explicabo enim cumque porro aperiam occaecati minima',
        userId: 6,
      },
      {
        completed: false,
        id: 102,
        title: 'explicabo enim cumque porro aperiam occaecati minima',
        userId: 6,
      },
    ];
    toDoStoreMock.todo.mockReturnValue(mockToDoList);
    fixture.detectChanges();

    const listItems = fixture.nativeElement.querySelectorAll('.list-items');
    expect(listItems.length).toBe(2);
  });

  it('should update todo item when update button is clicked', async () => {
    const mockItem = {
      completed: false,
      id: 102,
      title: 'explicabo enim cumque porro aperiam occaecati minima',
      userId: 6,
    };
    toDoStoreMock.todo.mockReturnValue([mockItem]);
    fixture.detectChanges();

    const updateButton = fixture.nativeElement.querySelector('.update');
    updateButton.click();

    expect(toDoStoreMock.updateTodo).toHaveBeenCalledWith({
      ...mockItem,
      title: expect.any(String),
    });
  });

  it('should delete todo item when delete button is clicked', async () => {
    const mockItem = {
      completed: false,
      id: 102,
      title: 'explicabo enim cumque porro aperiam occaecati minima',
      userId: 6,
    };
    toDoStoreMock.todo.mockReturnValue([mockItem]);
    const deleteButton = fixture.nativeElement.querySelector('.delete');
    deleteButton.click();

    expect(toDoStoreMock.updateTodo).toHaveBeenCalledWith(mockItem.id);
  });

  it('should disable button when spinner is loading', async () => {
    toDoStoreMock.isLoading.mockReturnValue(true);
    fixture.detectChanges();

    const updateButton =
      fixture.nativeElement.querySelector('button[mat-button]');
    const deleteButton = fixture.nativeElement.querySelector(
      'button[color="warn"]'
    );
    const spinner = fixture.nativeElement.querySelector('mat-spinner');

    expect(updateButton.disabled).toBe(true);
    expect(deleteButton.disabled).toBe(true);
    expect(spinner).toBeTruthy();
  });

  it('should enable button and hide spinner when spinner is not loading', async () => {
    toDoStoreMock.isLoading.mockReturnValue(false);
    fixture.detectChanges();

    const updateButton =
      fixture.nativeElement.querySelector('button[mat-button]');
    const deleteButton = fixture.nativeElement.querySelector(
      'button[color="warn"]'
    );
    const spinner = fixture.nativeElement.querySelector('mat-spinner');

    expect(updateButton.disabled).toBe(false);
    expect(deleteButton.disabled).toBe(false);
    expect(spinner).toBeFalsy();
  });
});
