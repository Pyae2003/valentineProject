"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HeartCrack } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-pink-200">
          <HeartCrack className="h-8 w-8 text-pink-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-pink-600 mb-2">
          Oops… Something went wrong
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Even love has little errors sometimes 💔  
          Please try again — everything will be okay.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={reset}
            className="w-full rounded-xl bg-pink-500 hover:bg-pink-600"
          >
            Try Again 💗
          </Button>

          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => (window.location.href = "/")}
          >
            Go Home 🏡
          </Button>
        </div>
      </div>
    </div>
  );
}
