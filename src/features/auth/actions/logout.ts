"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const logout = async() => {
    await auth.api.signOut({
        // This endpoint requires session cookies.
        headers: await headers(),
    });
}