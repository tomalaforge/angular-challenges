import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe(AppComponent.name, () => {
  beforeEach(() => {
    cy.mount(AppComponent, {
      providers: [provideRouter(appRoutes)],
    });
    cy.get('nav a:first').click();
  });

  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', () => {
      cy.get('input[name=bookName]').as('bookControl').clear();
      cy.contains('Search criteria is required!');

      cy.get('@bookControl').type('kill');
      cy.contains('Search criteria is required!').should('not.exist');
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', () => {
      cy.get('input[name=bookName]').as('bookControl').type('NonExistingBook');
      cy.get('button').contains('Borrow').click();

      cy.get('[data-testid="no-book-found-msg"]').should('be.visible');
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', () => {
      cy.get('input[name=bookName]').as('bookControl').type('1984');
      cy.get('button').contains('Borrow').click();

      cy.get('[data-testid="search-error-msg"]').should('not.exist');
      cy.contains('1984 by George Orwell').should('be.visible');
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', () => {
      cy.get('input[name=bookName]').as('bookControl').type('HOBBIT');
      cy.get('button').contains('Borrow').click();

      cy.get('[data-testid="search-error-msg"]').should('not.exist');
      cy.contains('The Hobbit by J.R.R. Tolkien').should('be.visible');
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', () => {
      cy.get('input[name=bookName]').as('bookControl').type('the');
      cy.get('button').contains('Borrow').click();

      cy.get('ul li').should('have.length.greaterThan', 1);

      cy.contains('The Hobbit by J.R.R. Tolkien').should('be.visible');
      cy.contains('The Great Gats by F. Scott Fitzgerald').should('be.visible');
      cy.contains('The Lord of the Rings by J.R.R. Tolkien').should(
        'be.visible',
      );
      cy.contains('The Catcher in the Rye by J.D. Salinger').should(
        'be.visible',
      );
      cy.contains('The Hunger Games').should('be.visible');
      cy.contains(
        "Harry Potter and the Philosopher's Stone by J.K. Rowling",
      ).should('be.visible');
    });
  });
});
