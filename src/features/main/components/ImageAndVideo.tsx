import FooterButton from "@/components/FooterButton";
import VideoAndImageFrameWrapperSimple from "@/components/VideoAndImageFrameWrapperSimple";
import { ourCouplePhotoPath, ourPhotosPath } from "@/constants/routes";
import Image from "next/image";

type ImageAndVideo = {
  soloUrl: string;
  coupleUrl: string;
};
const ImageAndVideo = ({ soloUrl, coupleUrl }: ImageAndVideo) => {
  const collections = [
    {
      id: 1,
      title: "Our Solo Photo Collections",
      description: `It wasn’t just a meeting.
      It felt like destiny whispering,
      “You’ve finally found home.`,
      path: ourPhotosPath,
      image: soloUrl,
      alt: "Our Photo Collections",
    },
    {
      id: 3,
      title: "Our Couple Photo, In Frames 🌼",
      description: "A collection of moments we never want to forget.",
      path: ourCouplePhotoPath,
      image: coupleUrl,
      alt: "Our Love In Frames",
    },
  ];

  return (
    <section className="w-full py-12 flex justify-center items-center">
      <div className="container px-4 md:px-6">
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2 
            gap-8 
            lg:gap-12
            place-items-center
          "
        >
          {collections.map((item) => (
            <div
              key={item.id}
              className="
                w-full 
                flex flex-col
                mx-auto
                items-center
                justify-center
              "
            >
              <div
                className="p-6 h-full flex flex-col justify-between    rounded-3xl 
                transition-all 
                duration-300 
                ease-out
                hover:-translate-y-2"
              >
                <VideoAndImageFrameWrapperSimple
                  title={item.title}
                  description={item.description}
                  Footer={<FooterButton name="View All" path={item.path} />}
                >
                  <div className=" rounded-2xl w-full aspect-[4/3] relative mb-4 shadow-sm">
                    <Image
                      src={item.image}
                      fill
                      unoptimized
                      alt={item.alt}
                      className="
                        object-cover
                        transition-transform 
                        duration-700
                        rounded-2xl
                        hover:scale-105
                      "
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 33vw"
                    />
                  </div>
                </VideoAndImageFrameWrapperSimple>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageAndVideo;
