import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey =
  "YOUR_SUPABASE_KEY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
