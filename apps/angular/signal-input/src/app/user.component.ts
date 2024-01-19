import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

type Category = 'Youth' | 'Junior' | 'Open' | 'Senior';
const ageToCategory = (age: number): Category => {
  if (age < 10) return 'Youth';
  else if (age < 18) return 'Junior';
  else if (age < 35) return 'Open';
  return 'Senior';
};

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    {{ fullName() | titlecase }} plays tennis in the {{ category() }} category!!
  `,
  host: {
    class: 'text-xl text-green-800',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  name = input.required<string>();
  lastName = input<string>();
  age = input<unknown>({ transform: numberAttribute });
  fullName = computed(() => this.name() + ' ' + this.lastName());
  category = computed(() => ageToCategory(Number(this.age()) ?? 0));
}

// Once again, Angular adds something without official documentation
// Input vs input
// what about output ?
// https://dev.to/railsstudent/examples-of-new-signal-inputs-in-angular-k0c
// withComponentInputBinding vs this
// input should be required initially? https://github.com/angular/angular/issues/53909 -> which choice leads to more boilerplate?
// https://github.com/angular/angular/issues/53969 - numberAttribute gotchas
// You get a `Input Is Required But No Value Is Available Yet` error if you don't call the signal in the fullName literal
// i.e. this.fullName = `${this.name} ${this.lastName ?? ''}`
// ngOnChanges -> computed
