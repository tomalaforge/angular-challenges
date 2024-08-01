import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SkipSelf,
} from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { randText } from '@ngneat/falso';
import { TodoDetails } from './../../model/user';
import { CrudSpecialService } from './../../services/crud-special.service';

@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [CommonModule, MatProgressSpinner],
  templateUrl: `./to-do.component.html`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoComponent implements OnInit {
  @Input() todo!: TodoDetails;
  @Output() todoChange = new EventEmitter<TodoDetails>();
  @Output() todoDelete = new EventEmitter<TodoDetails>();
  //@Output() update = new EventEmitter<TodoDetails>();
  public loading = true;

  constructor(@SkipSelf() private todoService: CrudSpecialService) {}

  ngOnInit(): void {
    this.loading = this.todo == undefined;
  }

  deleteTodo(): void {
    this.loading = true;
    this.todoService.deleteTodo(this.todo).subscribe(() => {
      this.todoDelete.emit(this.todo);
    });
  }

  updateTodo(): void {
    this.loading = true;
    this.todo.title = randText();
    this.todoService.updateTodo(this.todo).subscribe((todoUpdated) => {
      this.todo.title = todoUpdated.title;
      this.loading = false;
      this.todoChange.emit(this.todo);
      this.emitUpdate();
    });
  }

  emitUpdate() {
    this.todoChange.emit(this.todo);
    //console.log(this.todo);
  }
}
