import { OurDate } from "@/generated/prisma/client";
import { AppError } from "../../../../middleware";
import { prisma } from "../../../lib/prisma";
import { getSession } from "@/Utils/get-sessions";
import { redirect } from "next/navigation";
import { loginPath } from "@/constants/routes";

export const getCurrentDate = async (userAuthId: string) => {
  try {

    const session = await getSession();

    if(!session){
        redirect(loginPath)
    };

    const currentDate = await prisma.ourDate.findUnique({
      where: {
        userId: userAuthId,
      },
    });

    if (!currentDate) {
        return 
    }

    return currentDate;

  } catch (error) {
    console.error("Current Anni Date getting Error:", error);
    throw new AppError("Current Anni Date getting Error!", 500);
  }
};
