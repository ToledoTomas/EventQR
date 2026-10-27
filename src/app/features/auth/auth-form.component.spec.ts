import { TestBed } from "@angular/core/testing";
import { AuthFormComponent } from "./auth-form.component";

describe("AuthFormComponent", () => {
  it("keeps submission disabled until credentials are valid and Auth is configured", async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(AuthFormComponent);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      "button",
    ) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fixture.componentRef.setInput("configured", true);
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
  });
});
