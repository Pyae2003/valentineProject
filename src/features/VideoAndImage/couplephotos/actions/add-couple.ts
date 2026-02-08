"use server"

import { actionClient, prisma } from "@/lib";
import { revalidatePath } from "next/cache";
import { ourCouplePhotoPath } from "@/constants/routes";
import { AppError } from "../../../../../middleware";
import { addSoloImageServerSchema } from "../../schemas";
import { redirect } from "next/navigation";

export const addCouplePhotos = actionClient.inputSchema(addSoloImageServerSchema).action(async({parsedInput : {name,title,description,imagePath}})=>{
    try {
        const addImage = await prisma.ourCoupleImage.create({
            data : {
                name,
                title,
                description,
                imagePath,
            }
        });

        if(!addImage){
            throw new AppError("Image Adding Fail!",400);
        };

    } catch (error) {
        console.error("SoloImage Adding:", error);
        throw new AppError("SoloImageAdding Error", 500);
    }

    revalidatePath(ourCouplePhotoPath);
    redirect(ourCouplePhotoPath);
})