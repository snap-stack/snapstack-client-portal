
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

const SUPABASE_URL = 'https://smvuusdoipaywvbqernt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtdnV1c2RvaXBheXd2YnFlcm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NDk3MjQsImV4cCI6MjA2NDEyNTcyNH0.qopjw_XkBe6S96xyebdnV-kG-uBX9-09fMlphgH68Bg';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
