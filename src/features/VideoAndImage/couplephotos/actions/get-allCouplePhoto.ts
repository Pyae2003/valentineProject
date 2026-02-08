"use server"

import { prisma } from "@/lib";
import { supabaseServer } from "@/lib/supabase-server";
import { AppError } from "../../../../../middleware";


export interface  ImageResult {
    id : string,
    title : string,
    description : string,
    url : string | undefined
}

export const getAllCouplePhoto = async () => {
    try {
        const allPhoto = await prisma.ourCoupleImage.findMany({
            orderBy : {
                createdAt : "desc"
            }
        });


        const coupleImageWithUrl = await Promise.all(
              allPhoto.map(async (image) => {
                const { data, error } = await supabaseServer.storage
                  .from("OurCoupleImageAndVideo")
                  .createSignedUrl(image.imagePath, 60 * 60 * 24 * 7);
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
        

        return  coupleImageWithUrl.filter(Boolean) as ImageResult[];
        

    } catch (error) {
        console.error("Get All Solo Photo:", error);
        throw new AppError("Get All Solo Photo Error", 500);
    }
}