"use client"

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

    const currentTime = () => setCurrentTime([audio.currentTime]);

    const durationTime = () => setDurationTime(audio.duration);

    audio.addEventListener("timeupdate", currentTime);
    audio.addEventListener("loadedmetadata", durationTime);

    return () => {
      audio.removeEventListener("timeupdate", currentTime);
      audio.removeEventListener("loadedmetadata", durationTime);
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

    return `${FormatMinute} : ${FormatSecond}`;
  };

  const handleSliderEvent = (time: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time[0];
    setCurrentTime(time);
  }

  return (
    <div>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-pink-100 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl w-[380px] button-0 left-0 z-50">
        <audio ref={audioRef} src={url} />

        <div className="flex items-center gap-4 mb-3">
          <Button
            onClick={() => togglePlay()}
            className="w-10 h-10 rounded-full bg-pink-500 
      text-white flex items-center justify-center"
          >
            {isPlaying ? <CirclePauseIcon className="h-4 w-4 hover:bg-pink-300" /> : <PlayCircleIcon className="h-4 w-4 hover:bg-pink-300" />}
          </Button>

          <span className="text-sm font-medium truncate">{title} : 💗</span>
        </div>

        {/* Progress */}
        <Slider
          value={currentTime}
          max={durationTime}
          step={1}
          onValueChange={handleSliderEvent}
        />

        {/* Time */}
        <div className="flex justify-between text-xs mt-1">
          <span>{formatTime(currentTime[0])}</span>
          <span>{formatTime(durationTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default Audio;
