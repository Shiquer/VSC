import { createClient } from '@supabase/supabase-js';

// Use the Supabase client from integrations for consistency
export { supabase } from '@/integrations/supabase/client';

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          service: string;
          date: string;
          time: string;
          message?: string;
          status: 'pending' | 'confirmed' | 'cancelled';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          service: string;
          date: string;
          time: string;
          message?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          service?: string;
          date?: string;
          time?: string;
          message?: string;
          status?: 'pending' | 'confirmed' | 'cancelled';
          created_at?: string;
        };
      };
    };
  };
};