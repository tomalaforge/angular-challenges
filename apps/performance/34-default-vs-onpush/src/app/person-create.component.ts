import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-person-create',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  host: {
    class: 'w-4/5',
  },
})
export class PersonCreateComponent {
  newPerson = output<string>();
  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.newPerson.emit(this.label);
      this.label = '';
    }
  }
}
