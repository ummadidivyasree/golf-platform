import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mwpmhtqxgokaxuaohtot.supabase.co";
const supabaseKey = "sb_publishable_0bwByY0VgNBTzCFqowCl6A_fbTDzTRe";

export const supabase = createClient(supabaseUrl, supabaseKey);