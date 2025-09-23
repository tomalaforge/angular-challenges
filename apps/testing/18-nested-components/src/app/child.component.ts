import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
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
  template: `
    <p>Title is {{ title() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  title = input('');
}

@Component({
  selector: 'app-button',
  template: `
    <button (click)="validate.emit()">Validate</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  validate = output();
}

@Component({
  selector: 'app-error',
  template: `
    <p>Title is required !!!</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}

@Component({
  selector: 'app-child',
  imports: [],
  template: `
    <app-input #input />
    <result [title]="input.title.value" />
    <app-button (validate)="submit(input.title.value)" />
    @if (showError) {
      <app-error />
    }
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
