import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  const setup = () => {
    cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });
  };

  test('error modal is displayed if you click on "Confirm" without inputting a name', () => {
    setup();

    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container div').should(
      'contain.text',
      'You must enter a name first!!',
    );
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', () => {
    setup();

    cy.get('input').type('John Doe');
    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container').contains('div', 'Name: John Doe');
    cy.contains('button', 'Cancel').click();
    cy.contains('div', 'Name is invalid !!');
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', () => {
    setup();

    cy.get('input').type('John Doe');
    cy.contains('button', 'Confirm').click();

    cy.get('mat-dialog-container').contains('div', 'Name: John Doe');
    cy.contains('button', 'Confirmation').click();
    cy.contains('div', 'Name has been submitted');
  });
});
