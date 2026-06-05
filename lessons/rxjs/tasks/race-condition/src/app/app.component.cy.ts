import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';

describe(AppComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(AppComponent, {
      add: {
        imports: [MatDialogModule],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(AppComponent);

    cy.get('button').click();
    cy.get('ul li').should('have.length', '3');
  });
});
