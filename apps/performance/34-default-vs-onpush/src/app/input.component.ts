import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
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
    <mat-form-field class="w-4/5" cd-flash>
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
  readonly onLabelAdded = output<string>();
  protected readonly label = signal<string>('');

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onLabelAdded.emit(this.label());
    }
  }
}
