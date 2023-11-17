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
  selector: 'app-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatInputModule, CDFlashingDirective],
  host: {
    class: 'w-3/4',
  },
  template: `
    <mat-form-field class="w-full">
      <input
        placeholder="Add one member to the list"
        matInput
        type="text"
        [value]="label()"
        (keydown)="handleEvent($event)" />
    </mat-form-field>
  `,
  styles: [],
})
export class InputComponent {
  label = signal('');
  @Output() inputEvent = new EventEmitter<string>();

  handleEvent(event: any) {
    if (event.keyCode === 13) {
      if (!this.label()) return;
      this.inputEvent.emit(this.label());
      this.label.set('');
    } else {
      this.label.update(() => event.target.value);
    }
  }
}
