import { getAllSoloPhoto } from "@/features/VideoAndImage/actions/get-allPhoto"
import OurAllPhotos from "@/features/VideoAndImage/components/OurAllPhotos"

const page = async  () => {
    const allImage = await getAllSoloPhoto();
  return (
    <div className="w-full mt-10">
        <OurAllPhotos  AllImage={allImage}/>
    </div>
  )
}

export default page