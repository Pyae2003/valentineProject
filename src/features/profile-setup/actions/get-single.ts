import { getSession } from "@/Utils/get-sessions";
import { AppError } from "../../../../middleware";
import { prisma } from "@/lib";
import { success } from "zod";

export const getSingleData = async () => {
  try {
    const session = await getSession();

    const userId = session?.user.id;

    if (!userId) {
      throw new AppError("Please Login First!", 401);
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    if (!profile) {
      throw new AppError("Please Set up First", 404);
    }

    return {
      success: true,
      profile,
    };
  } catch (error) {
    console.log("Single Getting Error!", error);
    throw new AppError("Single Getting Error!", 500);
  }
};
