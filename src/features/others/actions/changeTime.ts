"use server"

import { actionClient } from "@/lib";
import { AppError } from "../../../../middleware";
import { getSession } from "@/Utils/get-sessions";
import { ourDateSchema } from "../Schema/change-date.schema";
import { prisma } from '../../../lib/prisma';


export const changeTime = actionClient.inputSchema(ourDateSchema).action(async({parsedInput : { days,months,year}})=>{
    try {
        const user = await getSession();
        const userAuthId = user?.user.id;

        if(!userAuthId){
            throw new AppError("Please Login First!",402)
        };

        if(!days || !months || !year){
          throw new AppError("Days and Months and Years Not Found !", 404);

        };

        const getTime = await prisma.ourDate.findUnique({
            where : {
                userId : userAuthId
            }
        })
        
        const MarkNewAnniDate = await prisma.ourDate.update({
            where : {id : getTime?.id },
            data : {
                days : days && days ,
                months : months && months,
                year : year && year,
                userId : userAuthId
            }
        });

        if(!MarkNewAnniDate){
            throw new AppError("Anni Date Updating Fail!", 400);
        };

        return {
            success : true,
            message : "Anni Date Updating Success!"
        };
           
        
    } catch (error) {
        console.error("Anni Date Updating Error:", error);
        throw new AppError("Anni Date Updating Error!", 500);
    };
})