
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gymiyvtfjesuyvlaolsd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5bWl5dnRmamVzdXl2bGFvbHNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTc0OTUsImV4cCI6MjA1OTU5MzQ5NX0.a-YN31TaMBEcTjAMeWuEzjNwPKsZhYbQHhz_IRsAvPY';

export const supabase = createClient(supabaseUrl, supabaseKey);
