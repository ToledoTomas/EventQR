import { InjectionToken } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

export const SUPABASE = new InjectionToken<SupabaseClient | null>('Supabase client', {
  providedIn: 'root',
  factory: () => {
    const { supabaseUrl, supabasePublishableKey } = environment;
    if (!/^https:\/\/[\w.-]+\.supabase\.co$/.test(supabaseUrl) || !supabasePublishableKey.trim()) return null;
    return createClient(supabaseUrl, supabasePublishableKey);
  },
});
