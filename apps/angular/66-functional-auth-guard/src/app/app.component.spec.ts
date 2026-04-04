import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { page, userEvent } from 'vitest/browser';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home.component';
import { routes } from './app.routes';
import { AppComponent } from './app.component';

describe('Auth Guards', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    TestBed.createComponent(AppComponent);
  });

  describe('AuthGuard', () => {
    it('Then should redirect to / when not logged in', async () => {
      const guard = TestBed.inject(AuthGuard);
      const result = guard.canActivate();
      expect(result).toBeFalsy();
    });

    it('Then should allow access when logged in', async () => {
      const authService = TestBed.inject(AuthService);
      authService.login('user');
      const guard = TestBed.inject(AuthGuard);
      const result = guard.canActivate();
      expect(result).toBe(true);
    });
  });

  describe('AdminGuard', () => {
    it('Then should redirect to / when not logged in', async () => {
      const guard = TestBed.inject(AdminGuard);
      const result = guard.canActivate();
      expect(result).toBeFalsy();
    });

    it('Then should redirect to / when logged in as user', async () => {
      const authService = TestBed.inject(AuthService);
      authService.login('user');
      const guard = TestBed.inject(AdminGuard);
      const result = guard.canActivate();
      expect(result).toBeFalsy();
    });

    it('Then should allow access when logged in as admin', async () => {
      const authService = TestBed.inject(AuthService);
      authService.login('admin');
      const guard = TestBed.inject(AdminGuard);
      const result = guard.canActivate();
      expect(result).toBe(true);
    });
  });
});
