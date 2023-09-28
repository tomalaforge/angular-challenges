import { createOutputSpy } from 'cypress/angular';
import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  describe('Given an initualValue of 10', () => {
    it('listen to output using createOutputSpy', () => {
      cy.mount(CounterComponent, {
        componentProperties: {
          initialValue: 10,
          send: createOutputSpy<number>('emit'),
        },
      });

      cy.get(`[data-cy="increment"]`).click();
      cy.get(`[data-cy="send"]`).click();
      cy.get('@emit').should('have.been.calledWith', 11);
    });

    it('listen to output using autoSpyOutputs', () => {
      cy.mount(CounterComponent, {
        autoSpyOutputs: true,
        componentProperties: {
          initialValue: 10,
          send: createOutputSpy<number>('emit'),
        },
      });

      cy.get(`[data-cy="decrement"]`).click();
      cy.get(`[data-cy="decrement"]`).click();
      cy.get(`[data-cy="send"]`).click();

      cy.get('@sendSpy').should('have.been.calledWith', 8);
    });
  });
});
