import { loginPath } from "@/constants/routes";
import { getAllCouplePhoto } from "@/features/VideoAndImage/couplephotos/actions/get-allCouplePhoto"
import OurAllCouplePhotos from "@/features/VideoAndImage/couplephotos/components/OurAllCouplePhoto";
import { getSession } from "@/Utils/get-sessions";
import { redirect } from "next/navigation";

const page = async () => {

  const allCoupleImage = await getAllCouplePhoto();
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
    <div>
        {
          !!session && (
            <OurAllCouplePhotos AllCoupleImage={allCoupleImage} />
          )
        }
    </div>
  )
}

export default page