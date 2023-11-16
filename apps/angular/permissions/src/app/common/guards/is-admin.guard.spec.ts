import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { isAdminGuard } from './is-admin.guard';

describe('isAdminGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
