import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(AppComponent.name, () => {
  beforeEach(() => {
    cy.mount(AppComponent, {
      imports: [BrowserAnimationsModule],
    });
  });

  test('After confirm button is clicked with no input a error modal should pop up', () => {
    cy.contains('button', 'Confirm').click();
    cy.get('mat-dialog-container').contains('h1', 'Error');
    cy.contains('button', 'OK').click();
  });

  describe('After entering input and click confirm button a profile modal should pop up', () => {
    beforeEach(() => {
      cy.get('input').type('Testing');
      cy.contains('button', 'Confirm').click();
      cy.get('mat-dialog-container').contains('h1', 'Profil');
      cy.get('mat-dialog-container').contains('Name: Testing');
    });

    test('After clicking cancel there should be error message displayed in HTML', () => {
      cy.contains('button', 'Cancel').click();
      cy.contains('Name is invalid !!');
    });

    test('After clicking confirmation there should be success message displayed in HTML', () => {
      cy.contains('button', 'Confirmation').click();
      cy.contains('Name has been submitted');
    });
  });
});
