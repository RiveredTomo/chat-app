import { createClient } from "@supabase/supabase-js";

export type Database = {
  id: string;
  name: string;
  message: string;
  created_at: string;
  is_ai: boolean;
  // count: number;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;