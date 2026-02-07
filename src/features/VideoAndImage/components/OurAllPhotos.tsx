import React from "react";
import { ImageResult } from "../actions/get-allPhoto";
import VideoAndImageFrameWrapperSimple from "@/components/VideoAndImageFrameWrapperSimple";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUp01Icon } from "lucide-react";
import { viewPath } from "@/constants/routes";

type OurAllPhotoProps = {
  AllImage: ImageResult[];
};
const OurAllPhotos = ({ AllImage }: OurAllPhotoProps) => {
  return (
    <div>
      {!!AllImage &&
        AllImage.map((image) => (
          <div className="w-full max-w-sm" key={image.id}>
            <VideoAndImageFrameWrapperSimple
              title="Our Photo Collections"
              description="Little moments matter."
              Footer={<FooterButton path={viewPath(image.id)} />}
            >
              <div className="overflow-hidden rounded-xl">
                <Image
                  src={image.url ? image.url : ""}
                  width={400}
                  height={300}
                  unoptimized
                  alt="Beautiful scenery"
                  className="w-full h-auto object-cover"
                />
              </div>
            </VideoAndImageFrameWrapperSimple>
          </div>
        ))}
    </div>
  );
};

type FooterButtonProps = {
  path: string;
};
const FooterButton = ({ path }: FooterButtonProps) => {
  return (
    <div>
      <Button variant={"link"}>
        <Link href={path} className="flex space-x-2">
          <ArrowUp01Icon />
          View Details
        </Link>
      </Button>
    </div>
  );
};

export default OurAllPhotos;
