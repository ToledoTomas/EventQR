import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterLink, MatButtonModule],
  template: `<section class="page-heading"><p class="eyebrow">ORGANIZACIÓN</p><h1>Eventos</h1><div class="empty-state"><h2>Todavía no hay eventos para mostrar</h2><p>La creación y gestión de eventos estará disponible en el próximo sprint.</p><a mat-stroked-button routerLink="/dashboard/events/new">Ver próxima función</a></div></section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {}
