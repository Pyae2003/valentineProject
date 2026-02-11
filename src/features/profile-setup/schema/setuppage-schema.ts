import { imageFileSchema } from "@/features/VideoAndImage/schemas"
import * as z from "zod"

export const profileSetupSchema = z.object({
    boyName  : z.string().min(2,"Name must be at least 2  characters!"),
    boyImage : imageFileSchema,
    girlName  : z.string().min(2,"Name must be at least 2  characters!"),
    girlImage : imageFileSchema
    
});


export const profileServerSetupSchema = z.object({
    boyName  : z.string().min(2,"Name must be at least 2  characters!"),
    boyImage : z.string(),
    girlName  : z.string().min(2,"Name must be at least 2  characters!"),
    girlImage : z.string(),
});