import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { availableBooks } from './book.model';

@Component({
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .error {
        color: red;
      }

      button {
        width: 300px;
        padding: 5px;
        border-radius: 5px;
      }

      .search label {
        margin-right: 15px;
      }
    `,
  ],
  template: `
    <div class="search">
      <label for="bookName">Search Book by author or title</label>
      <input
        type="text"
        id="bookName"
        name="bookName"
        [formControl]="searchBook"
        required />
      @if (searchBook.errors) {
        <div class="error">Search criteria is required!</div>
      }
    </div>
    <button
      data-cy="borrow-btn"
      routerLink="/shelf"
      [queryParams]="{ book: searchBook.value }"
      [disabled]="searchBook.errors"
      routerLinkActive="router-link-active">
      Borrow
    </button>
    <div>
      <h3>List of books available:</h3>
      <ul>
        @for (book of books; track $index) {
          <li>{{ book.name }} by {{ book.author }}</li>
        }
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchComponent {
  searchBook = new FormControl('', Validators.required);
  books = availableBooks;
}
