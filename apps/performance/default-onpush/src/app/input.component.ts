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
  template: ` <mat-form-field class="w-4/5" cd-flash>
    <input
      placeholder="Add one member to the list"
      matInput
      cd-flash
      type="text"
      [(ngModel)]="label"
      (keydown)="handleKey($event)" />
  </mat-form-field>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CDFlashingDirective,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  standalone: true,
})
export class InputComponent {
  label = '';

  @Output() readonly changeLabel: EventEmitter<string> =
    new EventEmitter<string>();

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.changeLabel.emit(this.label);
    }
  }
}
