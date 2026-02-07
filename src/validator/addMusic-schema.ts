import * as z from "zod"

const MAX_AUDIO_SIZE = 10 * 1024 * 1024; // 10MB

const ACCEPTED_AUDIO_TYPES = [
  "audio/mpeg", // mp3
  "audio/mp3", // mp3
  "audio/wav",
  "audio/x-wav",
  "audio/mp4",  // m4a
  "audio/ogg",
];

export const audioFileSchema = z
  .instanceof(File, { message: "Audio file is required" })
  .refine((file) => file.size <= MAX_AUDIO_SIZE, {
    message: "Audio must be less than 10MB",
  })
  .refine((file) => ACCEPTED_AUDIO_TYPES.includes(file.type), {
    message: "Only MP3, WAV, M4A, or OGG files are allowed",
  }).nullable();


export const audioTitleSchema  = z.object({
    title : z.string().min(2,"Enter SO").max(100,""),
    audio : audioFileSchema
});


export const createAudioSchema = z.object({
  title : z.string().min(2,"Enter SO").max(100,""),
  filePath : z.string()
})

