import * as z from "zod";

export const loginSchema = z.object({
  username: z.string().min(6, "Invalid Username!").max(15, "Invalid Username"),
  password: z
    .string()
    .min(6, "Invalid Password!").max(15, "Invalid Password"),
});
