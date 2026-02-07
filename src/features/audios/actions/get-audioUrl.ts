"use server";

import { prisma } from "@/lib";
import { AppError } from "../../../../middleware";
import { supabaseServer } from "@/lib/supabase-server";

export type AudioResult = {
    id : string,
    title : string,
    url : string | undefined
}

type audioStateLogicProps = {
  title: string;
};
export const allAudio = async ({ title }: audioStateLogicProps) => {
  try {
    const audios = await prisma.songlist.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const audiosWithUrl = await Promise.all(
      audios.map(async (audio) => {
        const { data, error } = await supabaseServer.storage
          .from("audios")
          .createSignedUrl(audio.filePath, 60 * 60 * 24);
        if(error){
            return null;
        };
        return {
            id : audio.id,
            title : audio.title,
            url : data?.signedUrl
        }
      }
    )
    );

    return  audiosWithUrl.filter(Boolean) as AudioResult[];

  } catch (error) {
    console.log("Find Many audio from query Error!", error);
    throw new AppError("Find Many audio from query Error!", 400);
  }
};
