import React from "react";
import VideoAndImageFrameWrapperSimple from "@/components/VideoAndImageFrameWrapperSimple";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUp01Icon } from "lucide-react";
import { viewPath } from "@/constants/routes";
import { ImageResult } from "../actions/get-allPhoto";

type OurAllPhotoProps = {
  AllImage: ImageResult[];
};

const OurAllPhotos = ({ AllImage }: OurAllPhotoProps) => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {AllImage?.map((image) => (
          <div key={image.id} className="w-full">
            <VideoAndImageFrameWrapperSimple
              title={image.title}
              description={image.description}
              Footer={<FooterButton path={viewPath(image.id)} />}
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src={image.url ?? ""}
                  fill
                  unoptimized
                  alt="Couple memory"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </VideoAndImageFrameWrapperSimple>
          </div>
        ))}
      </div>
    </div>
  );
};

type FooterButtonProps = {
  path: string;
};

const FooterButton = ({ path }: FooterButtonProps) => {
  return (
    <Button variant="default" asChild className="px-0 bg-pink-400 hover:bg-pink-700">
      <Link href={path} className="flex items-center gap-2 text-sm">
        <ArrowUp01Icon className="w-4 h-4" />
        View Details
      </Link>
    </Button>
  );
};

export default OurAllPhotos;
