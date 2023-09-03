import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  const setup = () => {
    cy.mount(ChildComponent);
  };
  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message and no http request has been sent', async () => {
      setup();
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message and send a http request to the backend', async () => {
      setup();
    });
  });
});
