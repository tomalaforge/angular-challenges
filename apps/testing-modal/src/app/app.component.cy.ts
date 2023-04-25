import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  describe('When nothing has been typed inside the name input, and When clicking on Confirm', () => {
    test('Then display error modal', async () => {
      cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });

      cy.contains('button', 'Confirm').click();

      cy.get('mat-dialog-container').contains('h1', 'Error');
    });
  });

  describe('Given a name and When clicking on Confim', () => {
    test('Then display Profil modal', async () => {
      cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });

      cy.get('input').type('toto');

      cy.contains('button', 'Confirm').click();

      cy.get('mat-dialog-container').contains('h1', 'Profil');
    });

    describe('When clicking on Cancel in the profile modal', () => {
      test('Then show "Name is invalid" error message', async () => {
        cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });

        cy.get('input').type('toto');

        cy.contains('button', 'Confirm').click();

        cy.get('mat-dialog-container').contains('h1', 'Profil');
        cy.get('mat-dialog-container').contains('Name: toto');

        cy.contains('button', 'Cancel').click();

        cy.contains('Name is invalid !!');
      });
    });

    describe('When clicking on Confirm in the profile modal', () => {
      test('Then show "Name has been submitted" message', async () => {
        cy.mount(AppComponent, { imports: [BrowserAnimationsModule] });

        cy.get('input').type('toto');

        cy.contains('button', 'Confirm').click();

        cy.get('mat-dialog-container').contains('h1', 'Profil');
        cy.get('mat-dialog-container').contains('Name: toto');

        cy.contains('button', 'Confirmation').click();

        cy.contains('Name has been submitted');
      });
    });
  });
});
