import { z } from "zod"


export const envSchema = z.object({
    USERNAME : z.string(),
    PASSWORD:z.string().min(8 , "Password must be at least 8!"),
    JWT_SECURITY : z.string(),
    JWT_EXPRIES_IN : z.string().default("7d"),
    DATABASE_URL: z.string(),
    DIRECT_URL:z.string(),
    SUPABASE_SERVICE_ROLE_KEY : z.string()
});

export const parsed = envSchema.safeParse({
    USERNAME : process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    JWT_SECURITY : process.env.JWT_SECURITY,
    JWT_EXPRIES_IN : process.env.JWT_EXPRIES_IN,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    SUPABASE_SERVICE_ROLE_KEY : process.env.SUPABASE_SERVICE_ROLE_KEY 
});

if(!parsed.success){
    console.log("Invalid Environment Variables!!", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables",);
}

export const serverEnv = parsed.data; 