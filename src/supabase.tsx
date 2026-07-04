import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ljuicuryswoawmdgrkae.supabase.co";
const supabaseKey = "sb_publishable_FYc-ctqUKuJB4sFWg14SsA_Xv3wT2vP";

export const supabase = createClient(supabaseUrl, supabaseKey);