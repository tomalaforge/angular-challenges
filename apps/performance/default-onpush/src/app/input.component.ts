import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CDFlashingDirective } from '@angular-challenges/shared/directives';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    CDFlashingDirective,
    FormsModule,
  ],
  template: ` <mat-form-field class="w-4/5" cd-flash>
    <input
      placeholder="Add one member to the list"
      matInput
      type="text"
      [(ngModel)]="label"
      (keydown)="handleKey($event)" />
  </mat-form-field>`,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class InputComponent {
  @Input() names: string[] = [];

  label = '';

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.names?.unshift(this.label);
      this.label = '';
    }
  }
}
