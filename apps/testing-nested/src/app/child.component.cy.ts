import { ChildComponent } from './child.component';

describe(ChildComponent.name, () => {
  const setup = () => {
    cy.mount(ChildComponent);
  };

  test('add Good title and send request title with no error', () => {
    setup();
  });

  test('fail validating title because no title were typed', () => {
    setup();
  });
});
