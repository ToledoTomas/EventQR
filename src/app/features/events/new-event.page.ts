import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterLink, MatButtonModule],
  template: `<section class="page-heading"><p class="eyebrow">PRÓXIMAMENTE</p><h1>Crear evento</h1><p>El formulario de eventos estará disponible en el siguiente sprint.</p><a mat-stroked-button routerLink="/dashboard/events">Volver a eventos</a></section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventPage {}
