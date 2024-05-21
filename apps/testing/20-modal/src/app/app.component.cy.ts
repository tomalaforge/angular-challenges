import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  const setup = () => {
    cy.mount(AppComponent);
  };

  test('error modal is displayed if you click on "Confirm" without inputing a name', () => {
    setup();
  });

  test('error message is shown if you click "Cancel" in the confirmation modal after submitting a name', () => {
    setup();
  });

  test('confirm message is shown if you click "Confirm" in the confirmation modal after submitting a name', () => {
    setup();
  });
});
