import { supabaseServer } from "./supabase-server"

export const GetSignUrl = async (Path : string) => {
    const {data , error} =await supabaseServer.storage.from("ourCouplePhoto").createSignedUrl(Path,60*60*24*7);

    if (error) {
        return null;
      };

    return {
        signUrl : data.signedUrl
    }

}