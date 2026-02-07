import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getSession = await auth.api.getSession({
    headers : await headers()
})