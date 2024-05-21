import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CDFlashingDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-field',
  template: `
    <div>
      <mat-form-field class="w-4/5" cd-flash>
        <input
          placeholder="Add one member to the list"
          matInput
          type="text"
          [(ngModel)]="label"
          (keydown)="recordName($event)" />
      </mat-form-field>
    </div>
  `,
})
export class SearchFieldComponent {
  public label = '';
  @Output() searchFieldOutput = new EventEmitter<string>();

  public recordName(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.searchFieldOutput.emit(this.label);
    }
  }
}
