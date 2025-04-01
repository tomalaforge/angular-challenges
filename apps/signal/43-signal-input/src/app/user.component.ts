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
  readonly name = input.required<string>();
  readonly lastName = input('');
  readonly age = input<number, string>(0, {
    transform: numberAttribute,
  });

  readonly fullName = computed(() => `${this.name()} ${this.lastName()}`);
  readonly category = computed(() => ageToCategory(this.age()));
}
