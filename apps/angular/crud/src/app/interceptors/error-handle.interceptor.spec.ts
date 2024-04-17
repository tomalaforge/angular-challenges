import { HttpInterceptorFn } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { errorHandleInterceptor } from './error-handle.interceptor';

describe('errorHandleInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => errorHandleInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
