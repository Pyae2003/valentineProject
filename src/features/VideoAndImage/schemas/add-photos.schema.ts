import * as z from "zod"
import { baseschema } from "./base-schema"


const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageFileSchema = z
  .instanceof(File, { message: "Image file is required" })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Image must be less than 5MB",
  })
  .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
    message: "Only JPG, PNG, and WEBP images are allowed",
  });


export const addOurSoloImageSchema = z.object({
    ...baseschema,
    image : imageFileSchema
});

export const addSoloImageServerSchema = z.object({
    ...baseschema,
    imagePath : z.string()
});

