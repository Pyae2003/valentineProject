import * as z from "zod"

export const baseschema = {
    name  : z.string().min(2,"Name must be at least 2  characters!"),
    title  : z.string().min(2,"Title must be at least 2  characters!"),
    description  : z.string().min(6,"Description must be at least 6 characters!"),
}