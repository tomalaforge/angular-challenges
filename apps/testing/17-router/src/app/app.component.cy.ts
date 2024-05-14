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

      cy.contains('Search criteria is required!');
      cy.get('.error').should('exist');
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', () => {
      setup();

      cy.get('input').type('Not Found');

      cy.get('button').click();

      cy.contains('No book found for this search');
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', () => {
      setup();

      cy.get('input').type('Harry');

      cy.get('button').click();

      cy.contains("Harry Potter and the Philosopher's Stone by J.K. Rowling");
      cy.get('li').should('have.length', 1);
      cy.get('.error').should('not.exist');
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', () => {
      setup();

      cy.get('input').type('HARRY');

      cy.get('button').click();

      cy.contains("Harry Potter and the Philosopher's Stone by J.K. Rowling");
      cy.get('li').should('have.length', 1);
      cy.get('.error').should('not.exist');
    });
  });

  describe('Given a search criteria with multiple books matches', () => {
    it('Then shows a list of books', () => {
      setup();

      cy.get('input').type('Orwell');

      cy.get('button').click();

      cy.contains('1984 by George Orwell');
      cy.contains('Animal Farm by George Orwell');
      cy.get('li').should('have.length', 2);
      cy.get('.error').should('not.exist');
    });
  });
});
