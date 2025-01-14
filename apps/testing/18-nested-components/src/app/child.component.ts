import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './http.service';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  template: `
    <input type="text" [formControl]="title" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  title = new FormControl('', { nonNullable: true });
}

@Component({
  selector: 'result',
  standalone: true,
  template: `
    <p>Title is {{ title }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  @Input() title = '';
}

@Component({
  selector: 'app-button',
  standalone: true,
  template: `
    <button (click)="validate.emit()">Validate</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Output() validate = new EventEmitter();
}

@Component({
  selector: 'app-error',
  standalone: true,
  template: `
    <p>Title is required !!!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Output() validate = new EventEmitter();
}

@Component({
  selector: 'app-child',
  imports: [
    ResultComponent,
    ButtonComponent,
    InputComponent,
    ErrorComponent,
    NgIf,
  ],
  template: `
    <app-input #input></app-input>
    <result [title]="input.title.value"></result>
    <app-button (validate)="submit(input.title.value)"></app-button>
    <app-error *ngIf="showError"></app-error>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent {
  http = inject(HttpService);

  showError = false;

  submit(title: string) {
    this.showError = false;
    if (title === '') {
      this.showError = true;
      return;
    }

    this.http.sendTitle(title);
  }
}
