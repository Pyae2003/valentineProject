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
    <div className="sm:hidden">
    {/* Mobile Bottom Audio Player */}
    <div
      className="
        fixed bottom-0 left-0 right-0
        bg-pink-100 backdrop-blur-xl
        border-t border-pink-200
        px-4 pt-3 pb-[env(safe-area-inset-bottom)]
        shadow-2xl
        z-50
      "
    >
      <audio ref={audioRef} src={url} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-pink-500 text-white"
        >
          {isPlaying ? (
            <CirclePauseIcon className="h-5 w-5" />
          ) : (
            <PlayCircleIcon className="h-5 w-5" />
          )}
        </Button>

        <span className="flex-1 text-sm font-medium truncate text-gray-800">
          {title} 💗
        </span>
      </div>

      {/* Progress */}
      <Slider
        value={currentTime}
        max={durationTime}
        step={1}
        onValueChange={handleSliderEvent}
        className="w-full"
      />

      {/* Time */}
      <div className="flex justify-between text-xs mt-1 text-gray-600">
        <span>{formatTime(currentTime[0])}</span>
        <span>{formatTime(durationTime)}</span>
      </div>
    </div>
  </div>
  );
};

export default Audio;
