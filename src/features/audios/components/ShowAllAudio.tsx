"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { dashboard } from "@/constants/routes";
import { deletedAudio } from "../actions/deleted-audio";

import { Trash2, ArrowLeft, Music } from "lucide-react";
import { AudioResult } from "../actions";
import { AllAudioResult } from "../actions/get-allaudio";
import Audio from "./Audio";

type ShowAllAudioProps = {
  allAudio: AllAudioResult[];
  isLoading?: boolean;
};

// ------------------ MAIN COMPONENT ------------------
const ShowAllAudio = ({ allAudio, isLoading }: ShowAllAudioProps) => {
  const [currentAudio, setCurrentAudio] = useState<AudioResult | null>(null);
  if (isLoading) return <AudioSkeleton />;
  if (!allAudio?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center text-muted-foreground">
        <Music className="mb-4 h-10 w-10 opacity-50" />
        <p>No audio files found</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allAudio.map((audio, index) => (
          <motion.div
            key={audio.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AudioCard audio={audio} setCurrentAudio={setCurrentAudio} />
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        {currentAudio && <Audio {...currentAudio} />}
      </div>
    </>
  );
};

// ------------------ AUDIO CARD ------------------
const AudioCard = ({
  audio,
  setCurrentAudio,
}: {
  audio: AllAudioResult;
  setCurrentAudio: React.Dispatch<React.SetStateAction<AudioResult | null>>;
}) => {
  const [waveform] = useState<number[]>(() =>
    Array.from(
      { length: 30 },
      () => Math.floor(Math.random() * 80 + 20) // 20% - 100%
    )
  );

  return (
    <div>
      <Card className="flex h-full flex-col rounded-2xl border bg-background/80 backdrop-blur transition hover:shadow-xl">
        <div
          onClick={() =>
            setCurrentAudio({
              id: audio.id,
              title: audio.title,
              url: audio.url,
            })
          }
        >
          <CardHeader>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Song title
            </p>
            <CardTitle className="line-clamp-2 text-lg">
              {audio.title}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 space-y-3">
            <div className="text-sm">
              <span className="text-muted-foreground">Created</span>
              <p className="font-medium">
                {audio.createdAt.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* 🎵 Waveform Preview */}
            <div className="flex h-10 items-end gap-1 overflow-hidden rounded-md bg-muted p-2">
              {waveform.map((height, i) => (
                <span
                  key={i}
                  className="w-1 rounded bg-pink-400 animate-pulse"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </CardContent>
        </div>

        <CardFooter className="flex gap-3">
          <Button asChild variant="secondary" className=" gap-2">
            <Link href={dashboard}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Link>
          </Button>

          <DeleteConfirm id={audio.id} />
        </CardFooter>
      </Card>
    </div>
  );
};

// ------------------ DELETE CONFIRM ------------------
const DeleteConfirm = ({ id }: { id: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className=" gap-2">
          <Trash2 className="h-4 w-4" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form action={deletedAudio.bind(null, id)}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              music from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel type="button">Cancel</AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              variant={"destructive"}
              className="bg-destructive text-destructive-foreground"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// ------------------ SKELETON ------------------
const AudioSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="space-y-4 rounded-2xl p-6">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ShowAllAudio;
