import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  it('redirects unauthenticated users to login with a return URL', async () => {
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: { ready: Promise.resolve(), session: signal(null) } }] });
    const router = TestBed.inject(Router);
    const result = await TestBed.runInInjectionContext(() => authGuard({} as never, { url: '/dashboard/events' } as never));
    expect(router.serializeUrl(result as ReturnType<Router['createUrlTree']>)).toBe('/login?returnUrl=%2Fdashboard%2Fevents');
  });

  it('allows users with a session', async () => {
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useValue: { ready: Promise.resolve(), session: signal({ user: { id: '1' } }) } }] });
    const result = await TestBed.runInInjectionContext(() => authGuard({} as never, { url: '/dashboard' } as never));
    expect(result).toBe(true);
  });
});
