"use server";

import { prisma } from "@/lib";
import { AppError } from "../../../../middleware";
import { supabaseServer } from "@/lib/supabase-server";

export interface SingleImageResult {
  id: string;
}

export const SingleImage = async ({ id }: SingleImageResult) => {
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
