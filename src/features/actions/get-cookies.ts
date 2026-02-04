import { NextRequest,NextResponse } from "next/server";

export const getCookies = async ( req:NextRequest ) => {
   const token =  req.cookies.get("AuthToken")?.value;
   return NextResponse.json({token});
};