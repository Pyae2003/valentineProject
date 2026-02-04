"use server"

import { actionClient, prisma } from '@/lib';
import { AppError } from '../../../../middleware';
import { createAudioSchema } from '@/validator/addMusice-schema';

export const createAudio = actionClient
  .inputSchema(createAudioSchema)
  .action(async ({ parsedInput : {title,filePath}}) => {

    const existing = await prisma.songlist.findUnique({
      where: { title },
    });
    
    if (existing) {
      throw new Error("Song with this title already exists!");
    }
    const createAudio = await prisma.songlist.create({
      data: {
        title,
        filePath
      }
    });

    console.log("Audio Create", createAudio );
    if(!createAudio){
      throw new AppError("Audio Creation Fail!",400);
    }

    return { success: true , createAudio,message : "Audio Creation Success!" };
  });
