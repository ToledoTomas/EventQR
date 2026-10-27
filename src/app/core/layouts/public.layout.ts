import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { AuthService } from "../services/auth.service";

@Component({
  imports: [RouterLink, RouterOutlet, MatButtonModule],
  templateUrl: "./public.layout.html",
  styleUrl: "./header.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicLayout {
  protected readonly auth = inject(AuthService);
}
