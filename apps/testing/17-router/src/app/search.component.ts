import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { availableBooks } from './book.model';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgFor, NgIf],
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
      <div class="error" *ngIf="searchBook.errors">
        Search criteria is required!
      </div>
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
        <li *ngFor="let book of books">{{ book.name }} by {{ book.author }}</li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchComponent {
  searchBook = new FormControl('', Validators.required);
  books = availableBooks;
}
