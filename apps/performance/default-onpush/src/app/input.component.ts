import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Output() add: EventEmitter<string> = new EventEmitter<string>();

  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.add.emit(this.label);
      this.label = '';
    }
  }
}
