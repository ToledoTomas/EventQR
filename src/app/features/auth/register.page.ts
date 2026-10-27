import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { AuthFormComponent, Credentials } from "./auth-form.component";

@Component({
  imports: [RouterLink, AuthFormComponent],
  templateUrl: "./register.page.html",
  styleUrl: "./auth.page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly pending = signal(false);
  protected readonly error = signal("");
  protected readonly confirmed = signal(false);

  protected async submit({ email, password }: Credentials): Promise<void> {
    this.pending.set(true);
    this.error.set("");
    this.confirmed.set(false);
    try {
      this.confirmed.set(await this.auth.signUp(email, password));
      if (!this.confirmed()) await this.router.navigateByUrl("/dashboard");
    } catch (error) {
      this.error.set(
        error instanceof Error
          ? error.message
          : "No pudimos crear la cuenta. Intentá de nuevo.",
      );
    } finally {
      this.pending.set(false);
    }
  }
}
