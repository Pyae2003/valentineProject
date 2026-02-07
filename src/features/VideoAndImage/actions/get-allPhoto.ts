"use server"

import { prisma } from "@/lib";
import { AppError } from "../../../../middleware";
import { supabaseServer } from "@/lib/supabase-server";


export interface  ImageResult {
    id : string,
    title : string,
    description : string,
    url : string | undefined
}

export const getAllSoloPhoto = async () => {
    try {
        const allPhoto = await prisma.soloImage.findMany({
            orderBy : {
                createdAt : "desc"
            }
        });

        const audiosWithUrl = await Promise.all(
              allPhoto.map(async (image) => {
                const { data, error } = await supabaseServer.storage
                  .from("OurCoupleImageAndVideo")
                  .createSignedUrl(image.imagePath, 60 * 60 * 24);
                if(error){
                    return null;
                };
                return {
                    id : image.id,
                    title : image.title,
                    description : image.description,
                    url : data?.signedUrl
                }
              }
            )
            );
        

        return  audiosWithUrl.filter(Boolean) as ImageResult[];
        

    } catch (error) {
        console.error("Get All Solo Photo:", error);
        throw new AppError("Get All Solo Photo Error", 500);
    }
}