"use client";

import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const InputSongSearch = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(
    (searchParams.get("title") as string) ?? ""
  );
  const pathname = usePathname();

  const handleSubmit = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (!query.trim()) {
      params.delete("title");
    } else {
      params.set("title", query);
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    <div>
      <div
        className="sticky top-4 z-20 backdrop-blur-md w-60 md:w-180 bg-white/70 
        rounded-full  mx-auto px-6 py-3 shadow-lg"
      >
        <div className="flex items-center gap-3">
          <span className="text-pink-500">🎵</span>
          <Input
            type="text"
            value={query}
            placeholder="Search our song..."
            onChange={(e) => {
              setQuery(e.target.value);
              handleSubmit();
            }}
            className="flex-1 bg-transparent md:w-100 outline-none 
      placeholder:text-pink-300 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default InputSongSearch;
