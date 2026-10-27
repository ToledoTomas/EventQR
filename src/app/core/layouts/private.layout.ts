import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../services/auth.service";

@Component({
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatButtonModule],
  templateUrl: "./private.layout.html",
  styleUrl: "./header.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateLayout {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly signingOut = signal(false);
  protected readonly logoutError = signal("");

  protected async logout(): Promise<void> {
    this.signingOut.set(true);
    this.logoutError.set("");
    try {
      await this.auth.signOut();
      await this.router.navigateByUrl("/login");
    } catch {
      this.logoutError.set("No pudimos cerrar la sesión. Intentá de nuevo.");
    } finally {
      this.signingOut.set(false);
    }
  }
}
