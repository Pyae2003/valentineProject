"use server"

import { prisma } from "@/lib";
import { AppError } from "../../../../middleware";
import { supabaseServer } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { allmusic } from "@/constants/routes";

export const deletedAudio = async (id : string) => {
    try{
        if (!id){
            throw new AppError("Id Not Fount",404);
        };

        const check_id = await prisma.songlist.findUnique({
            where : {id}
        });

        if(!check_id){
            throw new AppError("Invalid Id",400);
        };

        const deletedAudioStorage = await supabaseServer.storage.from("audios").remove([check_id.filePath]);

        if(!deletedAudioStorage.data){
            throw new AppError("Audio Deletion from storage Fail!",400);
        };

        const deletedAudio = await prisma.songlist.delete({
            where : {
                id
            }
        });

        if(!deletedAudio){
            throw new AppError("Audio Deletion Fail!",400);
        };

    }catch(error){
        console.log("Deleted audio from query Error!", error);
        throw new AppError("Deleted audio from query Error!", 400);
    };

    revalidatePath(allmusic);
}   