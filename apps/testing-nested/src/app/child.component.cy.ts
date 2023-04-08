import { TestBed } from '@angular/core/testing';
import { ChildComponent } from './child.component';
import { HttpService } from './http.service';

describe('ChildComponent', () => {
  const setup = () => {
    cy.mount(ChildComponent).then(() => {
      const http = TestBed.inject(HttpService);
      cy.stub(http, 'sendTitle').as('http');
    });
  };
  describe('When typing nothing and clicking on Validate', () => {
    test('Then show "Title is required" error message and no http request has been sent', async () => {
      setup();

      cy.get('button').click();

      cy.contains('Title is required !!!');

      cy.get('@http').should('not.be.called');
    });
  });

  describe('When typing "Good" and clicking on Validate', () => {
    test('Then show "Title is Good" message, no error message and send a http request to the backend', async () => {
      setup();

      cy.get("input[type='text']").type('Good');
      cy.get('button').click();

      cy.contains('Title is required !!!').should('not.exist');

      cy.get('@http').should('be.called');
    });
  });
});
