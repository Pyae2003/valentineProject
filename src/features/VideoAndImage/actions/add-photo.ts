"use server"

import { actionClient, prisma } from "@/lib";
import { addSoloImageServerSchema } from "../schemas";
import { AppError } from "../../../../middleware";
import { revalidatePath } from "next/cache";
import { ourPhotosPath } from "@/constants/routes";

export const addPhotos = actionClient.inputSchema(addSoloImageServerSchema).action(async({parsedInput : {name,title,description,imagePath}})=>{
    try {
        const addImage = await prisma.soloImage.create({
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
    revalidatePath(ourPhotosPath);
})