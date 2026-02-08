"use server"

import { prisma } from "@/lib";
import { supabaseServer } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";
import { ourCouplePhotoPath, ourPhotosPath } from "@/constants/routes";
import { redirect } from "next/navigation";
import { AppError } from "../../../../../middleware";

export const deleteCouplePhoto = async (id : string) => {
    try {

        if(!id) {
            throw new AppError("ID NOT FOUND!",404);
        };


        const check_id = await prisma.ourCoupleImage.findUnique({
            where: {
              id 
            },
          });
      
        if (!check_id) {
            throw new AppError("Invalid Id", 400);
        };

        const storageDelete = await supabaseServer.storage.from("OurCoupleImageAndVideo").remove([check_id.imagePath]);

        if(!storageDelete.data){
            throw new AppError("Storage Deletion Error",400);
        }

        const deletePhoto = await prisma.ourCoupleImage.delete({
            where : {
                id 
            }
        });

        if(!deletePhoto){
            throw new AppError("Deletion Photo Fail!",400);
        }
        

    } catch (error) {
        console.error("Delete Couple Photo Error:", error);
        throw new AppError("Delete Couple Photo Error:", 500);
    };

    revalidatePath(ourCouplePhotoPath);
    redirect(ourCouplePhotoPath);

}