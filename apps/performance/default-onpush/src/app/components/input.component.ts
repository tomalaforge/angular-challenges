import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CDFlashingDirective,
  ],
  host: {
    class: 'w-4/5',
  },
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [value]="label()"
        (keydown)="handleKey($event)" />
    </mat-form-field>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  label = signal('');
  @Output() inputEvent: EventEmitter<string> = new EventEmitter();

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.inputEvent.emit(event.target.value);
      this.label.set('');
    } else {
      this.label.update(() => event.target.value);
    }
  }
}
