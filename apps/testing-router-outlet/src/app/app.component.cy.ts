import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

describe(AppComponent.name, () => {
  const setup = () => {
    cy.mount(AppComponent, {
      providers: [provideRouter(appRoutes)],
    });
    cy.get('nav a:first').click();
  };
  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', () => {
      setup();

      cy.get('input[name=bookName]').as('bookControl').clear();
      cy.contains('Search criteria is required!');

      cy.get('@bookControl').type('kill');
      cy.contains('Search criteria is required!').should('not.exist');
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', () => {
      setup();

      cy.get('input[name=bookName]').clear().type('sddfs');

      cy.get('[data-cy="borrow-btn"]').click();

      cy.contains('No book found for this search');
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', () => {
      setup();

      cy.get('input[name=bookName]').clear().type('kill');

      cy.get('[data-cy="borrow-btn"]').click();

      cy.get('li').should('have.length', 1);
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', () => {
      setup();

      cy.get('input[name=bookName]').clear().type('KiLl');

      cy.get('[data-cy="borrow-btn"]').click();

      cy.get('li').should('have.length', 1);
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', () => {
      setup();

      cy.get('input[name=bookName]').clear().type('Tolkien');

      cy.get('[data-cy="borrow-btn"]').click();

      cy.get('li').should('have.length', 2);
    });
  });
});
