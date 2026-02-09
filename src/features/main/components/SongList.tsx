"use client";

import Audio from "../../audios/components/Audio";
import { useState } from "react";
import { AudioResult } from "@/features/audios/actions/get-audioUrl";

type SongListProps = {
  songs: AudioResult[];
};

const SongList = ({ songs }: SongListProps) => {
  const [currentAudio, setCurrentAudio] = useState<AudioResult | null>(null);
  return (
    <div className="w-full px-4">
      <div className="mx-auto mt-3 max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        {songs.map((song) => (
          <button
            key={song.id}
            onClick={() => setCurrentAudio(song)}
            className="
              w-full flex justify-between items-center
              px-5 py-4
              text-left
              hover:bg-pink-50
              active:scale-[0.98]
              transition
            "
          >
            <span className="text-sm font-medium truncate text-gray-700">
              🎼 {song.title}
            </span>
            <span className="text-pink-400 text-lg">♡</span>
          </button>
        ))}
      </div>

      {/* Global Audio Player */}
      <div className="flex items-center justify-center">
        {currentAudio && <Audio {...currentAudio} />}
      </div>
    </div>
  );
};

export default SongList;
