import * as z from "zod";

const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10MB

const ACCEPTED_AUDIO_TYPES = [
  "audio/mpeg", // mp3
  "audio/mp3", // mp3
  "audio/wav",
  "audio/x-wav",
  "audio/mp4", // m4a
  "audio/ogg",
  "audio/m4a",
];
const audioExtensions = [".mp3", ".wav", ".m4a", ".ogg"];

export const audioFileSchema = z
  .instanceof(File, { message: "Audio file is required" })
  .refine((file) => file.size <= MAX_AUDIO_SIZE, {
    message: "Audio must be less than 10MB",
  })
  .refine(
    (file) => {
      const fileType = file.type.toLowerCase().trim();
      const fileName = file.name.toLowerCase().trim();

      const hasValidMimeType = ACCEPTED_AUDIO_TYPES.includes(fileType);
      const hasValidExtension = audioExtensions.some((ext) =>
        fileName.endsWith(ext)
      );
      return hasValidExtension || hasValidMimeType;
    },
    {
      message: "Only MP3,M4a, WAV, M4A, or OGG files are allowed",
    }
  )
  .nullable();

export const audioTitleSchema = z.object({
  title: z.string().min(2, "Enter SO").max(100, ""),
  audio: audioFileSchema,
});

export const createAudioSchema = z.object({
  title: z.string().min(2, "Enter SO").max(100, ""),
  filePath: z.string(),
});
