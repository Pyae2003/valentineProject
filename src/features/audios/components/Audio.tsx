"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { AudioResult } from "@/features/audios/actions/get-audioUrl";
import { CirclePauseIcon, PlayCircleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Audio = ({ title, url }: AudioResult) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number[]>([0]);
  const [durationTime, setDurationTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) throw new Error("Audio Not Found!");

    const handleTimeUpdate = () => setCurrentTime([audio.currentTime]);
    const handleLoadedMetadata = () => setDurationTime(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number) => {
    const minute = Math.floor(time / 60);
    const second = Math.floor(time % 60);
    const FormatMinute = minute < 10 ? "0" + minute : minute;
    const FormatSecond = second < 10 ? "0" + second : second;
    return `${FormatMinute}:${FormatSecond}`;
  };

  const handleSliderEvent = (time: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time[0];
    setCurrentTime(time);
  };

  return (
    <div
      className="
        fixed bottom-0 
        z-50
        w-80
        bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100
        backdrop-blur-xl
        border-t border-pink-200
        px-4 sm:px-6
        pt-3 pb-[env(safe-area-inset-bottom)]
         rounded-2xl  
        shadow-[0_-10px_30px_rgba(236,72,153,0.25)]
      "
    >
      <audio ref={audioRef} src={url} />

      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <Button
          onClick={togglePlay}
          className="
            w-11 h-11
            rounded-full
            bg-pink-500 hover:bg-pink-600
            text-white
            shadow-md
          "
        >
          {isPlaying ? (
            <CirclePauseIcon className="h-5 w-5" />
          ) : (
            <PlayCircleIcon className="h-5 w-5" />
          )}
        </Button>

        <span className="flex-1 text-sm sm:text-base font-semibold truncate text-pink-700">
          {title} 💗
        </span>
      </div>

      {/* Slider */}
      <Slider
        value={currentTime}
        max={durationTime}
        step={1}
        onValueChange={handleSliderEvent}
        className="w-full"
      />

      {/* Time */}
      <div className="flex justify-between text-xs sm:text-sm mt-1 text-pink-600">
        <span>{formatTime(currentTime[0])}</span>
        <span>{formatTime(durationTime)}</span>
      </div>
    </div>
  );
};

export default Audio;
