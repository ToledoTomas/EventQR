import { inject, Injectable, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { SUPABASE } from '../config/supabase';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly client = inject(SUPABASE);
  readonly configured = this.client !== null;
  readonly session = signal<Session | null>(null);
  readonly loading = signal(true);
  readonly ready: Promise<void>;

  constructor() {
    if (!this.client) {
      this.ready = Promise.resolve();
      this.loading.set(false);
      return;
    }
    this.client.auth.onAuthStateChange((_event, session) => this.session.set(session));
    this.ready = this.client.auth.getSession().then(({ data, error }) => {
      if (!error) this.session.set(data.session);
    }).finally(() => this.loading.set(false));
  }

  async signIn(email: string, password: string): Promise<void> {
    if (!this.client) throw new Error('Configurá Supabase para iniciar sesión.');
    const { error } = await this.client.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signUp(email: string, password: string): Promise<boolean> {
    if (!this.client) throw new Error('Configurá Supabase para registrarte.');
    const { data, error } = await this.client.auth.signUp({ email, password });
    if (error) throw error;
    return data.session === null;
  }

  async signOut(): Promise<void> {
    if (!this.client) return;
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
    this.session.set(null);
  }
}
