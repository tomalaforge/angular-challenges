import { createOutputSpy } from 'cypress/angular';
import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  describe('Given an initialValue of 10', () => {
    it('listen to output using createOutputSpy', () => {
      cy.mount(CounterComponent, {
        componentProperties: {
          send: createOutputSpy('sendSpy'),
          initialValue: 10,
        },
      });

      cy.get('p').contains('Counter: 10');

      cy.get('button:contains(Increment)').click();

      cy.get('p').contains('Counter: 11');

      cy.get('button:contains(Decrement)').click().click();

      cy.get('p').contains('Counter: 9');

      cy.get('button:contains(Send)').click();

      expect(cy.get('@sendSpy').should('have.been.calledWith', 9));
    });

    it('listen to output  using autoSpyOutputs', () => {
      cy.mount(CounterComponent, {
        componentProperties: { initialValue: 10 },
        autoSpyOutputs: true,
      });

      cy.get('p').contains('Counter: 10');

      cy.get('button:contains(Increment)').click();

      cy.get('p').contains('Counter: 11');

      cy.get('button:contains(Decrement)').click().click();

      cy.get('p').contains('Counter: 9');

      cy.get('button:contains(Send)').click();

      expect(cy.get('@sendSpy').should('have.been.calledWith', 9));
    });
  });
});
