import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../core/services/auth.service';

@Component({
  imports: [ReactiveFormsModule, RouterLink, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <section class="auth-card">
      <p class="eyebrow">EVENTQR</p><h1>{{ isRegister ? 'Crear cuenta' : 'Bienvenido de nuevo' }}</h1>
      @if (!auth.configured) { <p class="notice" role="status">Supabase todavía no está configurado. Completá la URL y la publishable key en <code>src/environments/environment.ts</code> para usar el acceso.</p> }
      @if (confirmed()) { <p class="notice" role="status">Revisá tu correo para confirmar la cuenta antes de ingresar.</p> }
      @if (error()) { <p class="notice error" role="alert">{{ error() }}</p> }
      <form [formGroup]="form" (ngSubmit)="submit()">
        <mat-form-field appearance="outline"><mat-label>Correo electrónico</mat-label><input matInput type="email" autocomplete="email" formControlName="email" required>
          @if (form.controls.email.invalid && form.controls.email.touched) { <mat-error>Ingresá un correo válido.</mat-error> }
        </mat-form-field>
        <mat-form-field appearance="outline"><mat-label>Contraseña</mat-label><input matInput type="password" [attr.autocomplete]="isRegister ? 'new-password' : 'current-password'" formControlName="password" required>
          @if (form.controls.password.invalid && form.controls.password.touched) { <mat-error>La contraseña debe tener al menos 6 caracteres.</mat-error> }
        </mat-form-field>
        <button mat-flat-button type="submit" [disabled]="form.invalid || pending() || !auth.configured">{{ pending() ? 'Enviando…' : isRegister ? 'Crear cuenta' : 'Ingresar' }}</button>
      </form>
      <p class="auth-switch">{{ isRegister ? '¿Ya tenés cuenta?' : '¿Todavía no tenés cuenta?' }} <a [routerLink]="isRegister ? '/login' : '/register'">{{ isRegister ? 'Ingresar' : 'Registrarme' }}</a></p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPage {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  protected readonly pending = signal(false);
  protected readonly error = signal('');
  protected readonly confirmed = signal(false);
  protected readonly form = this.fb.nonNullable.group({ email: ['', [Validators.required, Validators.email]], password: ['', [Validators.required, Validators.minLength(6)]] });
  protected readonly isRegister = this.route.snapshot.routeConfig?.path === 'register';

  protected async submit(): Promise<void> {
    if (this.form.invalid || this.pending() || !this.auth.configured) return;
    this.pending.set(true);
    this.error.set('');
    this.confirmed.set(false);
    const { email, password } = this.form.getRawValue();
    try {
      if (this.isRegister) {
        this.confirmed.set(await this.auth.signUp(email, password));
        if (this.confirmed()) return;
      } else {
        await this.auth.signIn(email, password);
      }
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
      await this.router.navigateByUrl(returnUrl?.startsWith('/dashboard') ? returnUrl : '/dashboard');
    } catch (error) {
      this.error.set(error instanceof Error ? error.message : 'No pudimos completar la solicitud. Intentá de nuevo.');
    } finally {
      this.pending.set(false);
    }
  }
}
