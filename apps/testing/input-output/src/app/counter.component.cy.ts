import { createOutputSpy } from 'cypress/angular';
import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  describe('Given an initualValue of 10', () => {
    it('listen to output using createOutputSpy', () => {
      cy.mount(CounterComponent, {
        componentProperties: {
          initialValue: 10,
          send: createOutputSpy<boolean>('sendSpy'),
        },
      });

      cy.get('[data-testid="counter"]').should('contain', '10');
      cy.get('button:contains("Increment")').click().click().click();
      cy.get('[data-testid="counter"]').should('contain', '13');
      cy.get('button:contains("Decrement")').click().click();
      cy.get('[data-testid="counter"]').should('contain', '11');
      cy.get('button:contains("Send")').click();
      cy.get('@sendSpy').should('have.been.called.with', '11');
    });

    it('listen to output  using autoSpyOutputs', () => {
      cy.mount(CounterComponent, {
        autoSpyOutputs: true,
        componentProperties: {
          initialValue: 10,
        },
      });

      cy.get('[data-testid="counter"]').should('contain', '10');
      cy.get('button:contains("Increment")').click().click().click();
      cy.get('[data-testid="counter"]').should('contain', '13');
      cy.get('button:contains("Decrement")').click().click();
      cy.get('[data-testid="counter"]').should('contain', '11');
      cy.get('button:contains("Send")').click();
      cy.get('@sendSpy').should('have.been.called.with', '11');
    });
  });
});
