import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  imports: [RouterLink, MatButtonModule],
  templateUrl: "./home.page.html",
  styleUrl: "./home.page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {}
