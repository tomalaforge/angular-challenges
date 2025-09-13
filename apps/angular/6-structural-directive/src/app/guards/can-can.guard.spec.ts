import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canCanGuard } from './can-can.guard';

describe('canCanGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canCanGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
