import { createClient } from "@supabase/supabase-js";
import { clientEnv } from "@/config";

export const SupabaseClient = createClient(
    clientEnv.NEXT_PUBLIIC_SUPABASE_URL!,
    clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)