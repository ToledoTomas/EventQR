import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  imports: [RouterLink, MatButtonModule],
  templateUrl: "./events.page.html",
  styleUrl: "./events.page.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsPage {}
