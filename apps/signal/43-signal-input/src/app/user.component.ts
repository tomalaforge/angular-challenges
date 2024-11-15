import { TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { ageToCategory } from './utils';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [TitleCasePipe],
  template: `
    {{ fullName() | titlecase }} plays tennis in the {{ category() }} category!
  `,
  host: {
    class: 'text-xl text-green-800',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  readonly name = input.required<string>();
  readonly lastName = input<string>('');
  readonly age = input<string>('');

  readonly fullName = computed(() => `${this.name()} ${this.lastName() ?? ''}`);
  readonly category = computed(() => ageToCategory(Number(this.age()) ?? 0));
}
