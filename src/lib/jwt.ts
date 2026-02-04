import { serverEnv } from "@/config/env-server";
import jwt from "jsonwebtoken"

type AdminPayloadType = {
    id : string;
    username :string
}
export const  generateToken =  (payload : AdminPayloadType) : string => {
    return  jwt.sign({payload},serverEnv.JWT_SECURITY,{algorithm : "HS256",expiresIn : serverEnv.JWT_EXPRIES_IN as jwt.SignOptions["expiresIn"] || "7d"})
};

export const verifyToken = (token : string) : AdminPayloadType => {
   return jwt.verify( token , serverEnv.JWT_EXPRIES_IN) as AdminPayloadType
}
