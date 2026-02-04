import { z } from "zod"


export const envSchema = z.object({
    NEXT_PUBLIIC_SUPABASE_URL : z.string(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY : z.string()
});

export const parsed = envSchema.safeParse({
    NEXT_PUBLIIC_SUPABASE_URL : process.env.NEXT_PUBLIIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
});

if(!parsed.success){
    console.log("Invalid Environment Variables!!", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables",);
}

export const clientEnv = parsed.data; 