"use server"

import { actionClient, prisma } from "@/lib";
import { AppError } from "../../../../middleware";
import { revalidatePath } from "next/cache";
import { dashboard } from "@/constants/routes";
import { redirect } from "next/navigation";
import { profileServerSetupSchema } from "../schema";
import { getSession } from "@/Utils/get-sessions";

export const createProfileImage = actionClient.inputSchema(profileServerSetupSchema).action(async({parsedInput : {boyName,boyImage,girlName,girlImage}})=>{
    try {
        const user = await getSession();
        const userAuthId = user?.user.id;

        if(!userAuthId){
            throw new AppError("Please Login First!",402)
        };

        const createProfile = await prisma.profile.upsert({
            where : {userId : userAuthId},
            update : {
               boyName ,
               boyImage,
               girlName,
               girlImage,
               userId : userAuthId,
               is_completed : true
            },
            create : {
                boyName ,
                boyImage,
                girlName,
                girlImage,
                userId : userAuthId,
                is_completed : true
            }
        });

        if(!createProfile){
            throw new AppError("Image Adding Fail!",400);
        };
        
    } catch (error) {
        console.error("SoloImage Adding:", error);
        throw new AppError("SoloImageAdding Error", 500);
    };

    revalidatePath(dashboard);
    redirect(dashboard);
})