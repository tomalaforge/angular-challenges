import { appRoutes } from './app.routes';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  const setup = () => {
    cy.mount(AppComponent, {
      providers: [provideRouter(appRoutes)],
    });
    cy.get('nav a:first').click();
  };
  describe('Given no search criteria', () => {
    it('Then shows error message and disabled button', async () => {
      await setup();
      //todo
      cy.get('input[id=bookName]').clear();
      cy.contains('Search criteria is required!');
      cy.get('data-cy="borrow-btn"').should('be.disabled');
    });
  });

  describe('Given a search criteria with no book match', () => {
    it('Then shows No book found', async () => {
      await setup();
      //todo
      cy.get('input[id=bookName]').clear().type('asdasdasd');
      cy.get('data-cy="borrow-btn"').click();
      cy.contains('No book found for this search');
    });
  });

  describe('Given a search criteria with one book match', () => {
    it('Then shows One book and no error', async () => {
      await setup();
      //todo
      cy.get('input[id=bookName]').clear().type('harper');
      cy.get('data-cy="borrow-btn"').click();
      cy.get('li').should('have.length', 1);
    });
  });

  describe('Given a search criteria in Uppercase with one book match', () => {
    it('Then shows One book and no error', async () => {
      await setup();
      //todo
      cy.get('input[id=bookName]').clear().type('HARPER');
      cy.get('data-cy="borrow-btn"').click();
      cy.get('li').should('have.length', 1);
    });
  });

  describe('Given a search criteria with multple books matches', () => {
    it('Then shows a list of books', async () => {
      await setup();
      //todo
      cy.get('input[id=bookName]').clear().type('Tolkien');
      cy.get('data-cy="borrow-btn"').click();
      cy.get('li').should('have.length', 2);
    });
  });
});
