// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zvgslkqouyfjraagemha.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Z3Nsa3FvdXlmanJhYWdlbWhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwNjk0MzcsImV4cCI6MjA2MDY0NTQzN30.A4JbNsdRlWn3PQBigFTZCZ70NDcGOn_rmuUXDiyauPQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);