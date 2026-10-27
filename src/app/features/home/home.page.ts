import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  imports: [RouterLink, MatButtonModule],
  template: `
    <section class="hero">
      <p class="eyebrow">EVENTOS GRATUITOS, MÁS SIMPLES</p>
      <h1>Organizá encuentros que dejan huella.</h1>
      <p class="lead">EventQR reúne la organización, las inscripciones y el acceso a tus eventos en un solo lugar. Estamos preparando las herramientas para tu próximo encuentro.</p>
      <div class="actions"><a mat-flat-button routerLink="/register">Crear cuenta</a><a mat-stroked-button routerLink="/login">Ya tengo cuenta</a></div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
