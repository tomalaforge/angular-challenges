import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-member-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, CDFlashingDirective],
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
})
export class MemberInputFieldComponent {
  @Output() newMemberEvent = new EventEmitter<string>();
  label = '';

  handleKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.newMemberEvent.emit(this.label);
      this.label = '';
    }
  }
}
