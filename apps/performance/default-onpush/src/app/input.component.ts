import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CDFlashingDirective,
  ],
  template: `
    <mat-form-field class="w-full" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [(ngModel)]="label"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Output() addItem = new EventEmitter<string>();
  label = '';

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.addItem.emit(this.label);
      this.label = '';
    }
  }
}
