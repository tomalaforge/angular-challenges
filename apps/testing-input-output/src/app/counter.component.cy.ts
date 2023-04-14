import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  it('using createOutputSpy', () => {
    cy.mount(CounterComponent);
  });

  it('using autoSpyOutputs', () => {
    cy.mount(CounterComponent);
  });
});
