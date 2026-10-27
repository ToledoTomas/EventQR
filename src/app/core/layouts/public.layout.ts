import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../services/auth.service';

@Component({
  imports: [RouterLink, RouterOutlet, MatButtonModule],
  template: `
    <header class="site-header"><div class="shell header-inner">
      <a class="brand" routerLink="/" aria-label="EventQR, inicio">Event<span>QR</span></a>
      <nav aria-label="Navegación principal">
        @if (auth.session()) { <a mat-button routerLink="/dashboard">Panel</a> }
        @else { <a mat-button routerLink="/login">Ingresar</a><a mat-flat-button routerLink="/register">Crear cuenta</a> }
      </nav>
    </div></header>
    <main class="shell"><router-outlet /></main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout { protected readonly auth = inject(AuthService); }
