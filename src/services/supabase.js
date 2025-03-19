import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://nqulcbwebbjhqzpeyzvx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xdWxjYndlYmJqaHF6cGV5enZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyMzY1MTYsImV4cCI6MjA1NTgxMjUxNn0.gW5qqGfp5Q6yTzJsWmj4BohRUu5_DJ5ZahtRRJJJlA0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
