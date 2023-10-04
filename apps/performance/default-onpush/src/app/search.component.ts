import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    CDFlashingDirective,
    FormsModule,
  ],
  providers: [CDFlashingDirective],
  template: ` <mat-form-field class="w-4/5" cd-flash>
    <input
      placeholder="Add one member to the list"
      matInput
      type="text"
      [(ngModel)]="label"
      (keydown)="handleKey($event)" />
  </mat-form-field>`,
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  label = '';

  handleKey(event: any) {
    console.log(this.label);
    if (event.keyCode === 13) {
      this.search.emit(this.label);
      this.label = '';
    }
  }
}
