import FooterButton from "@/components/FooterButton";
import VideoAndImageFrameWrapperSimple from "@/components/VideoAndImageFrameWrapperSimple";
import { ourPhotosPath, ourSweetieMemoryPath } from "@/constants/routes";
import Image from "next/image";

const ImageAndVideo = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        
        {/* Card 1 */}
        <div className="w-full max-w-sm">
          <VideoAndImageFrameWrapperSimple
            title="Our Photo Collections"
            description="Little moments matter."
            Footer={<FooterButton name="View All" path={ourPhotosPath} />}
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/chittullay.jpg"
                width={400}
                height={300}
                alt="Beautiful scenery"
                className="w-full h-auto object-cover"
              />
            </div>
          </VideoAndImageFrameWrapperSimple>
        </div>

        {/* Card 2 */}
        <div className="w-full max-w-sm">
          <VideoAndImageFrameWrapperSimple
            title="Our Little Love Story in Motion ❤️"
            description="A collection of moments, laughs, memories, and love — captured one video at a time."
            Footer={<FooterButton name="View All" path={ourSweetieMemoryPath} />}
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/chittullay.jpg"
                width={400}
                height={300}
                alt="Beautiful scenery"
                className="w-full h-auto object-cover"
              />
            </div>
          </VideoAndImageFrameWrapperSimple>
        </div>

        {/* Card 3 */}
        <div className="w-full max-w-sm">
          <VideoAndImageFrameWrapperSimple
            title="Our Love, In Frames 🌼"
            description="A collection of moments we never want to forget."
            Footer={<FooterButton name="View All" path={ourSweetieMemoryPath} />}
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/images/chittullay.jpg"
                width={400}
                height={300}
                alt="Beautiful scenery"
                className="w-full h-auto object-cover"
              />
            </div>
          </VideoAndImageFrameWrapperSimple>
        </div>

      </div>
    </div>
  );
};

export default ImageAndVideo;
