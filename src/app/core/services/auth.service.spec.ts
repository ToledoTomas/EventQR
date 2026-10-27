import { TestBed } from "@angular/core/testing";
import { SupabaseClient } from "@supabase/supabase-js";
import { AuthService } from "./auth.service";
import { SUPABASE } from "../config/supabase";

describe("AuthService", () => {
  it("does not contact Supabase when configuration is missing", async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: SUPABASE, useValue: null }],
    });
    const auth = TestBed.inject(AuthService);
    await auth.ready;
    expect(auth.configured).toBe(false);
    expect(auth.loading()).toBe(false);
    await expect(auth.signIn("user@example.com", "secret")).rejects.toThrow(
      "Configurá Supabase",
    );
  });

  it("restores session and sends credentials through Supabase Auth", async () => {
    const session = { access_token: "test-token" };
    const getSession = vi
      .fn()
      .mockResolvedValue({ data: { session }, error: null });
    const signInWithPassword = vi.fn().mockResolvedValue({ error: null });
    const client = {
      auth: { getSession, signInWithPassword, onAuthStateChange: vi.fn() },
    } as unknown as SupabaseClient;
    TestBed.configureTestingModule({
      providers: [{ provide: SUPABASE, useValue: client }],
    });
    const auth = TestBed.inject(AuthService);
    await auth.ready;
    expect(auth.session()).toBe(session);
    await auth.signIn("user@example.com", "secret");
    expect(signInWithPassword).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret",
    });
  });
});
