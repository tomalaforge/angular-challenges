import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthService } from './auth.service';
import { routes } from './app.routes';

describe('Functional Auth Guards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    TestBed.createComponent(AppComponent);
  });

  describe('authGuard', () => {
    it('should redirect to / when not logged in', async () => {
      const router = TestBed.inject(Router);
      await router.navigate(['/dashboard']);
      expect(router.url).toBe('/');
    });

    it('should allow navigation when logged in', async () => {
      const authService = TestBed.inject(AuthService);
      const router = TestBed.inject(Router);
      authService.login('user');
      await router.navigate(['/dashboard']);
      expect(router.url).toBe('/dashboard');
    });
  });

  describe('adminGuard', () => {
    it('should redirect to / when not logged in', async () => {
      const router = TestBed.inject(Router);
      await router.navigate(['/admin']);
      expect(router.url).toBe('/');
    });

    it('should redirect to / when logged in as user', async () => {
      const authService = TestBed.inject(AuthService);
      const router = TestBed.inject(Router);
      authService.login('user');
      await router.navigate(['/admin']);
      expect(router.url).toBe('/');
    });

    it('should allow navigation when logged in as admin', async () => {
      const authService = TestBed.inject(AuthService);
      const router = TestBed.inject(Router);
      authService.login('admin');
      await router.navigate(['/admin']);
      expect(router.url).toBe('/admin');
    });
  });
});
