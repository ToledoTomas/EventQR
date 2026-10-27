import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  inject,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

export interface Credentials {
  email: string;
  password: string;
}

@Component({
  selector: "app-auth-form",
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: "./auth-form.component.html",
  styleUrl: "./auth-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  private readonly fb = inject(FormBuilder);
  readonly register = input(false);
  readonly pending = input(false);
  readonly configured = input(false);
  readonly submitted = output<Credentials>();
  protected readonly form = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  protected submit(): void {
    if (this.form.invalid || this.pending() || !this.configured()) return;
    this.submitted.emit(this.form.getRawValue());
  }
}
