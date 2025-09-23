import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { availableBooks } from './book.model';

@Component({
  selector: 'app-shelf',
  imports: [AsyncPipe],
  template: `
    <ul>
      @for (book of books | async; track book) {
        <li>Borrowed Book: {{ book.name }} by {{ book.author }}</li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShelfComponent {
  readonly books = inject(ActivatedRoute).queryParams.pipe(
    map((params) => params?.['book'].toLowerCase()),
    map((param) =>
      availableBooks.filter(
        (b) =>
          b.name.toLowerCase().includes(param) ||
          b.author.toLowerCase().includes(param),
      ),
    ),
  );
}
