import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { availableBooks } from './book.model';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgFor, NgIf],
  template: `
    <div>
      <label for="bookName">Choose Book by author or title</label>
      <input
        type="text"
        id="bookName"
        name="bookName"
        [formControl]="searchBook"
        required />
    </div>
    <div *ngIf="searchBook.errors">Search criteria is required!</div>
    <button
      routerLink="/shelf"
      [queryParams]="{ book: searchBook.value }"
      [disabled]="searchBook.errors"
      routerLinkActive="router-link-active">
      Get book
    </button>
    <div>List of books available:</div>
    <ul>
      <li *ngFor="let book of books">{{ book.name }} by {{ book.author }}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchComponent {
  searchBook = new FormControl('', Validators.required);
  books = availableBooks;
}
