import { loginPath } from "@/constants/routes";
import { getAllSoloPhoto } from "@/features/VideoAndImage/actions/get-allPhoto"
import OurAllPhotos from "@/features/VideoAndImage/components/OurAllPhotos"
import { getSession } from "@/Utils/get-sessions";
import { redirect } from "next/navigation";

const page = async  () => {
    const allImage = await getAllSoloPhoto();
    let session = null;

    try {
      session = await getSession();
    } catch (error) {
      console.error("Session error:", error);
    }
  
    if (!session) {
      redirect(loginPath);
    };
    
  return (
    <div className="w-full mt-10">
      {
        !!session && (
          <OurAllPhotos  AllImage={allImage}/>
        )
      }
    </div>
  )
}

export default page