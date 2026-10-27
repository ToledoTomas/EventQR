import { TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { HomePage } from "./home.page";

describe("HomePage", () => {
  it("shows registration and login links", async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const links = Array.from(
      fixture.nativeElement.querySelectorAll(
        "a",
      ) as NodeListOf<HTMLAnchorElement>,
    );
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/register",
      "/login",
    ]);
  });
});
