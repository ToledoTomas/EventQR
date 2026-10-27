import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";

@Component({
  imports: [RouterLink, MatButtonModule],
  templateUrl: "./new-event.page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventPage {}
