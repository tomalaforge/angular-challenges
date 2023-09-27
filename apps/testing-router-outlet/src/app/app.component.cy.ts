import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe(AppComponent.name, () => {
  beforeEach(() => {
    cy.mount(AppComponent, { providers: [provideRouter(appRoutes)] });
    cy.get('a').click();
  });

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', () => {
      cy.get('#bookName').clear(); // clear the input
      cy.contains('Search criteria is required!');
      cy.get(`[data-cy="borrow-btn"]`).should('be.disabled');
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', () => {
      cy.get('#bookName').type('asdfasdfasdf');
      cy.get(`[data-cy="borrow-btn"]`).should('be.enabled');
      cy.get(`[data-cy="borrow-btn"]`).click();
      cy.contains('No book found for this search');
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', () => {
      cy.get('#bookName').type('1984');
      cy.get(`[data-cy="borrow-btn"]`).should('be.enabled');
      cy.get(`[data-cy="borrow-btn"]`).click();
      cy.contains('Borrowed Book: 1984 by George Orwell');
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', () => {
      cy.get('#bookName').type('ANIMAL FARM');
      cy.get(`[data-cy="borrow-btn"]`).should('be.enabled');
      cy.get(`[data-cy="borrow-btn"]`).click();
      cy.contains('Borrowed Book: Animal Farm by George Orwell');
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', () => {
      cy.get('#bookName').type('Tolkien');
      cy.get(`[data-cy="borrow-btn"]`).should('be.enabled');
      cy.get(`[data-cy="borrow-btn"]`).click();
      cy.contains('Borrowed Book: The Lord of the Rings by J.R.R. Tolkien');
      cy.contains('Borrowed Book: The Hobbit by J.R.R. Tolkien');
    });
  });
});
