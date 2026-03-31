"use server"

import { actionClient } from "@/lib";
import { AppError } from "../../../../middleware";
import { getSession } from "@/Utils/get-sessions";
import { ourDateSchema } from "../Schema/change-date.schema";
import { prisma } from '../../../lib/prisma';


export const setTime = actionClient.inputSchema(ourDateSchema).action(async({parsedInput : {days,months,year}})=>{
    try {
        const user = await getSession();
        const userAuthId = user?.user.id;

        if(!userAuthId){
            throw new AppError("Please Login First!",402)
        };

        if(!days || !months || !year){
          throw new AppError("Days and Months and Years Not Found !", 404);

        };
        
        const MarkNewAnniDate = await prisma.ourDate.create({
            data : {
                days : days && days ,
                months : months && months,
                year : year && year,
                userId : userAuthId
            }
        });

        if(!MarkNewAnniDate){
            throw new AppError("Anni Date Adding Fail!", 400);
        };

        return {
            success : true,
            message : "Anni Date Adding Success!"
        };
           
        
    } catch (error) {
        console.error("Anni Date Adding Error:", error);
        throw new AppError("Anni Date Adding Error!", 500);
    };
})