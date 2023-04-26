import { createOutputSpy } from 'cypress/angular';
import { CounterComponent } from './counter.component';

describe(CounterComponent.name, () => {
  function clickOnIncrementControl() {
    cy.contains('button', 'Increment').click();
  }

  function clickSendControl() {
    cy.contains('button', 'Send').click();
  }

  it('using createOutputSpy', () => {
    cy.mount(CounterComponent, {
      componentProperties: {
        send: createOutputSpy('sendSpy'),
      },
    });

    clickOnIncrementControl();
    clickSendControl();

    cy.get('@sendSpy').should('have.been.calledWith', 1);
  });

  it('using autoSpyOutputs', () => {
    cy.mount(CounterComponent, {
      autoSpyOutputs: true,
    });

    clickOnIncrementControl();
    clickSendControl();

    cy.get('@sendSpy').should('have.been.calledWith', 1);
  });
});
