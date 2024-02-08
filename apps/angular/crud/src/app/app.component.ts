import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { AppService } from './app.service';
import { User } from './appInterface.component';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [AppService],
  selector: 'app-root',
  template: `
    @for (todo of todos(); track todo.id) {
      <div>
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="deleteUsers(todo.id)">Delete</button>
      </div>
    } @empty {
      <mat-spinner></mat-spinner>
    }
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  todos = signal<User[]>([]);

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getAllUsers().subscribe((todos) => {
      this.todos.set(todos);
    });
  }

  update(todo: User) {
    const todoClone = { ...todo };
    todoClone.title = randText();
    this.appService.updateUser(todoClone).subscribe((todoUpdated: User) => {
      this.todos.update((users) =>
        users.map((user) => (user.id === todoUpdated.id ? todoUpdated : user)),
      );
    });
  }

  deleteUsers(id: number) {
    this.appService.deleteUser(id).subscribe(() => {
      this.todos.update((users) => users.filter((t) => t.id !== id));
    });
  }
}
