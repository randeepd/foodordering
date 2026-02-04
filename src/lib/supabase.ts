import { createClient } from "@supabase/supabase-js";
import "expo-sqlite/localStorage/install";

const supabaseUrl = "https://fbnthdyfcpplznfsrswz.supabase.co";
const supabasePublishableKey = "sb_publishable_rBxFpvl0qAoa3-7Xf0Nvgw_OKLppGi7";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
