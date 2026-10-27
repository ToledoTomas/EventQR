import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterLink, MatButtonModule],
  template: `<section class="page-heading"><p class="eyebrow">ERROR 404</p><h1>No encontramos esta página</h1><p>Revisá la dirección o volvé al inicio.</p><a mat-flat-button routerLink="/">Ir al inicio</a></section>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPage {}
