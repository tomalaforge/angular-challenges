import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  Signal,
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
  name = input.required<string>();
  lastName = input<string>('');
  age = input<number, string>(0, { transform: numberAttribute });

  fullName: Signal<string> = computed(
    () => `${this.name()} ${this.lastName()}`,
  );

  category: Signal<Category> = computed(() => ageToCategory(this.age()));
}
