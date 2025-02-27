import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { TodoListComponent } from './features/todo-list/todo-list.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatCardModule,
        AppComponent,
        TodoListComponent,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render toolbar and todo list', () => {
    const toolbar = fixture.nativeElement.querySelector('mat-toolbar');
    const todoList = fixture.nativeElement.querySelector('app-todo-list');

    expect(toolbar).toBeTruthy();
    expect(todoList).toBeTruthy();
  });
});
