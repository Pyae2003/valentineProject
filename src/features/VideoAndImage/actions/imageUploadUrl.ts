"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { randomUUID } from "crypto";
import path from "path";

export async function imageUploadUrl(image : File) {
    // console.log("Image Uploade",image)
  const ext = path.extname(image.name);
  const filePath = `soloImage/${randomUUID()}${ext}`;

  const { data, error } = await supabaseServer.storage
    .from("OurCoupleImageAndVideo")
    .createSignedUploadUrl(filePath);

  if (error) {
    throw new Error("Failed to create signed upload URL");
  }

  return {
    signedUrl: data.signedUrl,
    path: data.path,
  };
}