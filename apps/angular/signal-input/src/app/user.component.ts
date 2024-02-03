import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
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
  name: InputSignal<string> = input.required<string>();
  lastName: InputSignal<string | unknown> = input<string | unknown>();
  age: InputSignal<number, string> = input<number, string>(0, {
    transform: (value: string) => Number(value),
  });

  fullName: Signal<string> = computed(
    () => `${this.name()} ${this.lastName() ?? ''}`,
  );
  category = computed(() => ageToCategory(this.age()));

  // extra: use age input as category alias
  // category: InputSignal<Category | unknown, string> = input<
  //   Category | unknown,
  //   string
  // >('Junior', {
  //   alias: 'age',
  //   transform: (value: string) => ageToCategory(Number(value)),
  // });
}
