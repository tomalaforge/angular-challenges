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
      <input
        type="text"
        matInput
        [formControl]="searchForm"
        placeholder="find a photo" />
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  readonly searchForm = new FormControl();
  private formInit = false;

  @Input({ required: true }) set term(term: string) {
    this.searchForm.setValue(term);
    this.formInit = true;
  }

  @Output() search = this.searchForm.valueChanges.pipe(
    skipWhile(() => !this.formInit),
    debounceTime(300),
    distinctUntilChanged(),
  );
}
