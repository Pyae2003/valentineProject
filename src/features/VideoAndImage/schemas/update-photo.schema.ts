import * as z from "zod"

export const UpdateSoloImageServerSchema = z.object({
    id : z.string().uuid(),
    name  : z.string().min(2,"Name must be at least 2  characters!").optional(),
    title  : z.string().min(2,"Title must be at least 2  characters!").optional(),
    description  : z.string().min(6,"Description must be at least 6 characters!").optional(),
    imagePath  : z.string().optional(),
    
})