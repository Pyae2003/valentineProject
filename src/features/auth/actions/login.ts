"use server"

import { AppError } from "../../../../middleware";
import { actionClient } from "@/lib";
import { loginSchema } from "@/validator";
import { auth } from "@/lib/auth";

export const login = actionClient
  .inputSchema(loginSchema)
  .action(async ({ parsedInput: { username, password } }) => {
    try {

      if (!username || !password) {
        throw new AppError("Usernaem and Password Not Found!", 400);
      };

      const data = await auth.api.signInUsername({
        body: {
          username,
          password,
        },
      });      

      console.log("LOGIN DATA PAR",data);

      if( !data ){
        throw new AppError("Login Fail!",401);
      };

      return {
        success : true,
        message : "❤️ Login Success 🌼"
      }

    } catch (error) {
      console.error("LOGIN_ERROR_LOG:", error);
      const message =  "Login Fail!";
      throw new AppError(message, 401);
    };
  });
