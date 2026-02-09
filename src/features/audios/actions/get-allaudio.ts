import { prisma } from "@/lib";
import { AppError } from "../../../../middleware";
import { supabaseServer } from "@/lib/supabase-server";
import { boolean } from "zod";

export type AllAudioResult = {
    id : string,
    title : string,
    url : string | undefined,
    createdAt :Date
}

export const getAllAudio = async () => {
    try {
        const allAudio = await prisma.songlist.findMany({
            orderBy : {
                createdAt : "desc"
            }
        });

        if(!allAudio){
            throw new AppError("Audio Not Found!",404);
        };

        const audiosWithUrl = await Promise.all(
            allAudio.map(async (audio) => {
              const { data, error } = await supabaseServer.storage
                .from("audios")
                .createSignedUrl(audio.filePath, 60 * 60 * 24);
              if(error){
                  return null;
              };
              return {
                  id : audio.id,
                  title : audio.title,
                  url : data?.signedUrl,
                  createdAt : audio.createdAt
              }
            }
          )
          );
      

        return {
            success : true,
            message : "All Audio Fetching Success!",
            audiosWithUrl
        }
    } catch (error) {
        console.log("Find Many audio from query Error!", error);
        throw new AppError("Find Many audio from query Error!", 400);
    }
}