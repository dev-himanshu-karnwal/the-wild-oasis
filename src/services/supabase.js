import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qclavyssjbsjxfqcahrr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjbGF2eXNzamJzanhmcWNhaHJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5NTU2NzAsImV4cCI6MjAyNDUzMTY3MH0.Iw5nSDbV7D3fgEFcNsdg-lyZZ2nvqvXDd7xGDXbNBzU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
