import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { availableBooks } from './book.model';

@Component({
  selector: 'app-shelf',
  imports: [AsyncPipe, JsonPipe, NgFor],
  template: `
    <ul>
      <li *ngFor="let book of books | async">
        Borrowed Book: {{ book.name }} by {{ book.author }}
      </li>
    </ul>
  `,
  styles: [],
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
