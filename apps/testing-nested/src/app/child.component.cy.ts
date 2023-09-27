import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  const setup = () => {
    cy.mount(ChildComponent);
  };

  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message and no http request has been sent', async () => {
      setup();

      cy.window()
        .its('console')
        .then((console) => {
          cy.spy(console, 'log').as('log');
        });

      cy.get(`[data-cy="input"]`).clear();

      cy.get('button').click();

      cy.get('p').should('have.text', 'Title is required !!!');

      cy.get('@log').should('not.have.been.called'); // really not necessary ?
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message and send a http request to the backend', async () => {
      setup();

      cy.window()
        .its('console')
        .then((console) => {
          cy.spy(console, 'log').as('log');
        });

      cy.get(`[data-cy="input"]`).clear();

      cy.get(`[data-cy="input"]`).type('Good');

      cy.get('p').should('have.text', 'Title is Good');

      cy.get('button').click();

      cy.get('@log').should('be.calledWith', 'Good has been sent !!!');
    });
  });
});
