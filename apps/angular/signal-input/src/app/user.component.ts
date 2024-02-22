import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Category, CategoryType } from './models/category.model';

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
  age = input(undefined, { transform: (v: string) => Number(v) });

  fullName = computed(() => `${this.name()} ${this.lastName()}`);
  category = computed(() =>
    this.age() ? Category.ageToCategory(this.age()!) : CategoryType.Junior,
  );
}
