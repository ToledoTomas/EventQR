import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterLink, MatButtonModule],
  template: `<section class="page-heading"><p class="eyebrow">ACCESO</p><h1>Check-in</h1><p>El escáner de entradas estará disponible en una próxima etapa.</p><a mat-stroked-button routerLink="/dashboard">Volver al panel</a></section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckInPage {}
