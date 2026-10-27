import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { AuthFormComponent, Credentials } from "./auth-form.component";

@Component({
  imports: [RouterLink, AuthFormComponent],
  templateUrl: "./login.page.html",
  styleUrl: "./auth.page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  protected readonly pending = signal(false);
  protected readonly error = signal("");

  protected async submit({ email, password }: Credentials): Promise<void> {
    this.pending.set(true);
    this.error.set("");
    try {
      await this.auth.signIn(email, password);
      const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
      await this.router.navigateByUrl(
        returnUrl?.startsWith("/dashboard") ? returnUrl : "/dashboard",
      );
    } catch (error) {
      this.error.set(
        error instanceof Error
          ? error.message
          : "No pudimos ingresar. Intentá de nuevo.",
      );
    } finally {
      this.pending.set(false);
    }
  }
}
