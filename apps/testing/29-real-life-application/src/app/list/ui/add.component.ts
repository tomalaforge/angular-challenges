import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
  ],
  templateUrl: './add.component.html',
})
export class AddComponent {
  @Input() loading = false;

  @Output() addTicket = new EventEmitter<string>();

  form = new FormGroup({
    description: new FormControl(null, Validators.required),
  });

  submit() {
    if (this.form.valid) {
      this.addTicket.emit(this.form.value.description ?? '');
    }
  }
}
