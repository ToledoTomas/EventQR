import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterLink, MatButtonModule],
  template: `<section class="page-heading"><p class="eyebrow">EVENTO</p><h1>Detalle de evento</h1><p>Esta página estará disponible cuando se publiquen eventos. Todavía no hay información para mostrar.</p><a mat-stroked-button routerLink="/">Volver al inicio</a></section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailPage {}
