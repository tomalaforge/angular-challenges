import { Component, HostListener, OnInit, inject } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { DialogService } from '../core/dialog.service';
import { AlertDialogComponent } from './dialog.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
      <ng-content />

      <div class="mt-4">
        <button
          [disabled]="form.invalid"
          type="submit"
          class="inline-block w-full rounded-lg border bg-gray-50 px-5 py-3 font-medium text-gray-900 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto">
          Submit
        </button>
      </div>
    </form>
  `,
  //TODO check alternatives using OnPush change detection strategy
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  submitted = false;

  protected readonly rootFormGroup = inject(FormGroupDirective);
  private readonly dialogService = inject(DialogService);

  @HostListener('window:beforeunload')
  canUnloadPage() {
    return this.formCanBeDeactivated();
  }

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.reset();
      this.submitted = true;
    }
  }

  canDeactivate() {
    return !this.formCanBeDeactivated()
      ? this.dialogService.showDialog(AlertDialogComponent, {
          role: 'alertdialog',
          disableClose: true,
          ariaLabelledBy: 'dialog-title',
          ariaDescribedBy: 'dialog-content',
        })
      : this.formCanBeDeactivated();
  }

  private formCanBeDeactivated() {
    if (this.submitted && !this.form.dirty) {
      return true;
    }

    const notEmptyFormControls = Object.values(this.form.getRawValue()).filter(
      (v) => v && v !== '',
    );

    if (!notEmptyFormControls.length) {
      return true;
    }

    return false;
  }
}
