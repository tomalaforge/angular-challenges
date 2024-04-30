import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-person-name-input',
  standalone: true,
  imports: [CDFlashingDirective, FormsModule, MatFormField, MatInput],
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown.enter)="onKeyDownEnter()" />
    </mat-form-field>
  `,
  host: {
    class: 'w-full',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonNameInputComponent {
  @Output() addName: EventEmitter<string> = new EventEmitter<string>();
  label = '';

  onKeyDownEnter() {
    this.addName.emit(this.label);
    this.label = '';
  }
}
