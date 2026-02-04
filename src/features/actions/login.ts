"use server"
import { AppError } from "../../../middleware";
import { actionClient, generateToken, prisma } from "@/lib";
import bcrypt from "bcrypt";
import { loginSchema } from "@/validator";
import { cookies } from "next/headers";

export const login = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    try {
      if (!username || !password) {
        throw new AppError("Usernaem and Password Not Found!", 400);
      }

      const checkAuth = await prisma.ourInfo.findUnique({
        where: {
          username,
        },
      });

      if (!checkAuth) {
        throw new AppError("Authenticaiton Fail!", 401);
      }

      const isValidPassword = await bcrypt.compare(
        password,
        checkAuth.password
      );

      if (!isValidPassword) {
        throw new AppError("Incorrect Password!", 401);
      }

      const token = await generateToken({ id: checkAuth.id, username });

      const cookieStore = cookies();

      (await cookieStore).set("thwezin", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 1 day
      });

    } catch (error) {
      console.log("Login Error!", error);
      throw new AppError("Login Error!", 401);
    }
  });
