import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  describe('Given an initualValue of 10', () => {
    it('listen to output using createOutputSpy', () => {
      cy.mount(CounterComponent);
    });

    it('listen to output  using autoSpyOutputs', () => {
      cy.mount(CounterComponent);
    });
  });
});
