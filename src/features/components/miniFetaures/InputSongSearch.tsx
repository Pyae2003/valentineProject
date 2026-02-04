"use client";

import { Input } from "@/components/ui/input";
import { dashboardQuery } from "@/constants/routes";
import { useRouter } from "next/navigation";
import { useState } from "react";

const InputSongSearch = () => {
  const [query, setQuery] = useState<string>("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(dashboardQuery(query));
  };

  return (
    <div>
      <div
        className="sticky top-4 z-20 backdrop-blur-md bg-white/70 
        rounded-full max-w-lg mx-auto px-6 py-3 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-pink-500">🎵</span>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={query}
              placeholder="Search our song..."
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent md:w-100 outline-none 
      placeholder:text-pink-300 text-sm"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputSongSearch;
