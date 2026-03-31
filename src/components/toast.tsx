"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function NoSongToast() {
  useEffect(() => {
    toast.warning("Songs Not Found!", {
      position: "top-center",
    });
  }, []);

  return null;
}