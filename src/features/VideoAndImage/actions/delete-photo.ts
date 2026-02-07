"use server"

import { prisma } from "@/lib";
import { AppError } from "../../../../middleware";
import { supabaseServer } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { ourPhotosPath } from "@/constants/routes";
import { redirect } from "next/navigation";

export const deletePhoto = async (id : string) => {
    try {

        if(!id) {
            throw new AppError("ID NOT FOUND!",404);
        };

        const cleanId = decodeURIComponent(id).replace("}", "");

        const singlePhoto = await prisma.soloImage.findUnique({
            where: {
              id : cleanId
            },
          });
      
        if (!singlePhoto) {
            throw new AppError("Invalid Id", 400);
        };

        const storageDelete = await supabaseServer.storage.from("OurCoupleImageAndVideo").remove([singlePhoto.imagePath]);

        if(!storageDelete.data){
            throw new AppError("Storage Deletion Error",400);
        }

        const deletePhoto = await prisma.soloImage.delete({
            where : {
                id : cleanId
            }
        });

        if(!deletePhoto){
            throw new AppError("Deletion Photo Fail!",400);
        }
        
        revalidatePath(ourPhotosPath);
        redirect(ourPhotosPath)

    } catch (error) {
        console.error("Delete Photo Error:", error);
        throw new AppError("Delete Photo Error:", 500);
    }

}