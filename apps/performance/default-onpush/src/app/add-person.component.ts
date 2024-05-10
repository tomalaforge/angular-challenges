import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'app-add-person',
  imports: [CDFlashingDirective, FormsModule, MatFormField, MatInput],
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
  host: {
    class: 'w-full flex flex-col items-center',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPersonComponent {
  label = signal('');
  addName = output<string>();

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addName.emit(this.label());
      this.label.set('');
    }
  }
}
