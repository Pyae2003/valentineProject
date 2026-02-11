import * as z from "zod"

export const profileUpdateSetupSchema = z.object({
    boyName  : z.string().min(2,"Name must be at least 2  characters!").optional(),
    boyImage: z.instanceof(File).optional(),
    girlName  : z.string().min(2,"Name must be at least 2  characters!").optional(),
    girlImage: z.instanceof(File).optional(),
});

export const profileUpdateServerSetupSchema = z.object({
    boyName  : z.string().min(2,"Name must be at least 2  characters!"),
    boyImage : z.string().optional(),
    girlName  : z.string().min(2,"Name must be at least 2  characters!"),
    girlImage : z.string().optional(),
});
