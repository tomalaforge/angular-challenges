import { TestBed } from '@angular/core/testing';
import { NxWelcomeComponent } from './nx-welcome.component';

describe(NxWelcomeComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(NxWelcomeComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('renders', () => {
    cy.mount(NxWelcomeComponent);
  });
});
