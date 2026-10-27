import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({ selector: 'app-root', imports: [RouterOutlet], template: '@if (auth.loading()) { <p class="loading-state" role="status">Cargando sesión…</p> } @else { <router-outlet /> }', changeDetection: ChangeDetectionStrategy.OnPush })
export class App { protected readonly auth = inject(AuthService); }
