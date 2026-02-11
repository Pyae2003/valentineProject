"use server"

import { actionClient, prisma } from "@/lib";
import { AppError } from "../../../../middleware";
import { revalidatePath } from "next/cache";
import {  dashboard } from "@/constants/routes";
import { redirect } from "next/navigation";
import { getSession } from "@/Utils/get-sessions";
import { supabaseServer } from "@/lib/supabase-server";
import { profileUpdateServerSetupSchema } from "../schema/updateprofile-schema";

export const updateProfileImage = actionClient.inputSchema(profileUpdateServerSetupSchema).action(async({parsedInput : {boyName,boyImage,girlName,girlImage}})=>{
    try {
        const user = await getSession();
        const userAuthId = user?.user.id;

        if(!userAuthId){
            throw new AppError("Please Login First!",402)
        };

        const exitingProfile = await prisma.profile.findUnique({
            where : {userId : userAuthId}
        });

        console.log(exitingProfile);

        if(!exitingProfile){
            throw new AppError("Profile Not Found, Please First set up!",404);
        };

        if (boyImage && exitingProfile.boyImage) {
            await supabaseServer.storage
              .from("ourCouplePhoto")
              .remove([exitingProfile.boyImage]);
          }
          
          if (girlImage && exitingProfile.girlImage) {
            await supabaseServer.storage
              .from("ourCouplePhoto")
              .remove([exitingProfile.girlImage]);
          }
          
        const createProfile = await prisma.profile.update({
            where : {
                userId : userAuthId
            },
            data : {
               boyName : boyName,
               boyImage : boyImage ?? exitingProfile.boyImage,
               girlName,
               girlImage : girlImage ?? exitingProfile.girlImage,
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