import { clientEnv } from "@/config";
import { serverEnv } from "@/config/env-server";
import { createClient } from "@supabase/supabase-js"

export const supabaseServer = createClient(
    clientEnv.NEXT_PUBLIIC_SUPABASE_URL!,
    serverEnv.SUPABASE_SERVICE_ROLE_KEY!
  );

