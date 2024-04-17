import { HttpInterceptorFn } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { loaderInterceptor } from './loader.interceptor';

describe('loaderInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => loaderInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
