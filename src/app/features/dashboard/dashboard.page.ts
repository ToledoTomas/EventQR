import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterLink, MatButtonModule],
  template: `<section class="page-heading"><p class="eyebrow">PANEL DEL ORGANIZADOR</p><h1>Bienvenido a EventQR</h1><p>Tu espacio para preparar próximos eventos. Las herramientas de gestión estarán disponibles en el siguiente sprint.</p><div class="actions"><a mat-flat-button routerLink="/dashboard/events">Ver eventos</a><a mat-stroked-button routerLink="/dashboard/check-in">Ir a check-in</a></div></section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
