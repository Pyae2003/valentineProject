import Link from "next/link";
import { Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboard } from "@/constants/routes";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-pink-50 via-white to-pink-100 px-4">
      <div className="max-w-md w-full text-center bg-white/80 backdrop-blur rounded-3xl shadow-xl p-10">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-3xl font-semibold text-pink-600 mb-2">
          Oops… Not Found 💔
        </h1>

        {/* MESSAGE */}
        <p className="text-pink-500 text-sm leading-relaxed mb-6">
          The page you’re looking for doesn’t exist anymore.<br />
          Maybe this memory has already faded…  
          but our love never will 💖
        </p>

        {/* ACTION */}
        <div className="flex justify-center">
          <Button
            asChild
            className="bg-pink-500 hover:bg-pink-600 rounded-full px-6"
          >
            <Link href={dashboard} className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-8 text-xs text-pink-400">
          Made with love, always 🌸
        </p>
      </div>
    </div>
  );
}
