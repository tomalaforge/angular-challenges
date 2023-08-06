import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, skipWhile } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field appearance="fill">
      <mat-label>Search</mat-label>
      <input type="text" matInput [formControl]="queryControl" />
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  readonly queryControl = new FormControl('', { nonNullable: true });
  private isInitialized = false;

  @Input({ required: true }) set query(query: string) {
    this.queryControl.setValue(query);
    this.isInitialized = true;
  }

  @Output() search = this.queryControl.valueChanges.pipe(
    skipWhile(() => !this.isInitialized),
    debounceTime(300),
    distinctUntilChanged()
  );
}
