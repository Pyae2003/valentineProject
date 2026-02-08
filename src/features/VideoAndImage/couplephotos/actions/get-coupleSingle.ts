"use server";

import { prisma } from "@/lib";
import { supabaseServer } from "@/lib/supabase-server";
import { AppError } from "../../../../../middleware";

export interface SingleImageResult {
  id: string;
}

export const coupleSingleImage = async ({ id }: SingleImageResult) => {
  try {

    console.log(id)

    if(!id) {
        throw new AppError("ID NOT FOUND!",404);
    };


    const singlePhoto = await prisma.ourCoupleImage.findUnique({
      where: {
        id 
      },
    });

    if (!singlePhoto) {
      throw new AppError("Invalid Id", 400);
    }

    const { data, error } = await supabaseServer.storage
      .from("OurCoupleImageAndVideo")
      .createSignedUrl(singlePhoto.imagePath, 60 * 60 * 24);
    if (error) {
      return null;
    };

    return {
        success : true,
        id: singlePhoto.id,
        name : singlePhoto.name,
        title: singlePhoto.title,
        description: singlePhoto.description,
        url: data?.signedUrl,
    };

  } catch (error) {
    console.error("Get Single Photo:", error);
    throw new AppError("Get Single Photo Error", 500);
  }
};
