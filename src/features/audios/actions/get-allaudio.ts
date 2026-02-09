import { prisma } from "@/lib";
import { AppError } from "../../../../middleware";

export const getAllAudio = async () => {
    try {
        const allAudio = await prisma.songlist.findMany({
            orderBy : {
                createdAt : "desc"
            }
        });

        if(!allAudio){
            throw new AppError("Audio Not Found!",404);
        };

        return {
            success : true,
            allAudio,
            message : "All Audio Fetching Success!"
        }
    } catch (error) {
        console.log("Find Many audio from query Error!", error);
        throw new AppError("Find Many audio from query Error!", 400);
    }
}