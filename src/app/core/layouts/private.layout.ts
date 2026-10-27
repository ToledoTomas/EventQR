import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule],
  template: `
    <header class="site-header"><div class="shell header-inner">
      <a class="brand" routerLink="/dashboard" aria-label="EventQR, panel">Event<span>QR</span></a>
      <nav aria-label="Navegación del organizador">
        <a mat-button routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Inicio</a>
        <a mat-button routerLink="/dashboard/events" routerLinkActive="active">Eventos</a>
        <a mat-button routerLink="/dashboard/check-in" routerLinkActive="active">Check-in</a>
        <button mat-button type="button" [disabled]="signingOut()" (click)="logout()">Salir</button>
      </nav>
    </div></header>
    <main class="shell">
      @if (logoutError()) { <p class="notice error" role="alert">{{ logoutError() }}</p> }
      <router-outlet />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly signingOut = signal(false);
  protected readonly logoutError = signal('');

  protected async logout(): Promise<void> {
    this.signingOut.set(true);
    this.logoutError.set('');
    try {
      await this.auth.signOut();
      await this.router.navigateByUrl('/login');
    } catch {
      this.logoutError.set('No pudimos cerrar la sesión. Intentá de nuevo.');
    } finally {
      this.signingOut.set(false);
    }
  }
}
