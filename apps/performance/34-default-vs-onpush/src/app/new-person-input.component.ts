import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-new-person-input',
  standalone: true,
  imports: [
    CommonModule,
    CDFlashingDirective,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    FormsModule,
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
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPersonInputComponent {
  public label!: string;

  public addName = output<string>();
  handleKey(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.addName.emit(this.label);
      this.label = '';
    }
  }
}
