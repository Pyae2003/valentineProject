"use server";

import { supabaseServer } from "@/lib/supabase-server";
import { getSession } from "@/Utils/get-sessions";
import { AppError } from "../../../../middleware";

export async function createProfileImageUploadUrls(ext1 : string , ext2 : string) {

  const user = await getSession();
  const userAuthId = user?.user.id;

  const timestamp = Date.now();


  const boyPath = `onlyProfile/${userAuthId}/boy-${timestamp}.${ext1}`;
  const girlPath = `onlyProfile/${userAuthId}/girl-${timestamp}.${ext2}`;

  const { data: boySigned  } =
    await supabaseServer.storage
      .from("ourCouplePhoto")
      .createSignedUploadUrl(boyPath);


  const { data: girlSigned  } =
    await supabaseServer.storage
      .from("ourCouplePhoto")
      .createSignedUploadUrl(girlPath);


    if( !boySigned || ! girlSigned){
        throw new AppError("Failed to create upload URLs",400);
    };

    console.log(girlPath,boyPath);
  return {
    boy: {
      path: boyPath,
      signedUrl: boySigned?.signedUrl,
    },
    girl: {
      path: girlPath,
      signedUrl: girlSigned?.signedUrl,
    },
  };
}