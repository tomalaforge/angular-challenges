import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-search',
  template: `
    <mat-form-field class="w-4/5" cd-flash>
      <input
        #inputElement
        placeholder="Add one member to the list"
        matInput
        type="text"
        [formControl]="searchControl"
        (keydown.enter)="onEnter()" />
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective, MatFormField, MatInput, ReactiveFormsModule],
  standalone: true,
})
export class SearchComponent {
  @Output() enter = new EventEmitter<string>();

  searchControl = new FormControl('');

  onEnter(): void {
    const value = this.searchControl.value;
    if (!!value && value.trim().length > 0) {
      this.enter.emit(value.trim());
      this.searchControl.reset();
    }
  }
}
