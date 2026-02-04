"use client";

import Audio from "./Audio";
import { useState } from "react";
import { AudioResult } from "@/features/actions/audios/get-audioUrl";

type SongListProps = {
  songs: AudioResult[];
};

const SongList = ({ songs }: SongListProps) => {
  const [currentAudio, setCurrentAudio] = useState<AudioResult | null>(null);
  return (
    <div>
      <div className="max-w-lg mx-auto mt-3 bg-white rounded-2xl shadow-xl overflow-hidden">
        {songs.map((song) => (
          <button
            key={song.id}
            className="w-full text-left px-6 py-4 
           hover:bg-pink-50 transition flex justify-between"
            onClick={() => setCurrentAudio(song)}
          >
            <span className="text-sm font-medium">🎼 {song.title}</span>
            <span className="text-pink-400">♡</span>
          </button>
        ))}
      </div>
      {!!currentAudio && <Audio {...currentAudio} />}
    </div>
  );
};

export default SongList;
