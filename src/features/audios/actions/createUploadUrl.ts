"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { randomUUID } from "crypto";

export async function createUploadUrl() {
  const filePath = `music/${randomUUID()}.mp3`;

  const { data, error } = await supabaseServer.storage
    .from("audios")
    .createSignedUploadUrl(filePath);

  if (error) {
    throw new Error("Failed to create signed upload URL");
  }

  return {
    signedUrl: data.signedUrl,
    path: data.path,
  };
}