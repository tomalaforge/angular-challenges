import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Need BrowserAnimationsModule or NoopAnimationsModule provided
// Or you could ignore it
// The Cypress.on call should probably go in a file in the cypress folder.

/*
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
*/

describe(AppComponent.name, () => {
  const setup = () => {
    cy.mount(AppComponent, {
      imports: [NoopAnimationsModule],
    });
  };

  test('error modal is displayed if you click on "Confirm" without inputing a name', () => {
    setup();

    cy.get('#mat-input-0').clear();
    cy.get('.mdc-button__label').click();

    cy.get('.mat-mdc-dialog-content').contains('You must enter a name first!!');
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', () => {
    setup();

    cy.get('#mat-input-1').clear();
    cy.get('#mat-input-1').type('Bill');
    //cy.get('.mdc-button__label').click(); // this worked in this test
    cy.contains('button', 'Confirm').click();

    //cy.get(`[data-cy="cancel"]`).click();
    cy.contains('button', 'Cancel').click();

    cy.get(`[data-cy="result"`).contains('Name is invalid !!');
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', () => {
    setup();

    cy.get('#mat-input-2').clear();
    cy.get('#mat-input-2').type('Bill');
    //cy.get('.mdc-button__label').click(); // this wasn't working in this test
    cy.contains('button', 'Confirm').click();

    // data-cy works even if button is hidden ?
    //cy.get(`[data-cy="confirmation"]`).click();
    cy.contains('button', 'Confirmation').click();

    cy.get(`[data-cy="result"`).contains('Name has been submitted');
  });
});
