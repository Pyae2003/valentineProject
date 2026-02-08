import React from "react";
import { ImageResult } from "../actions/get-allCouplePhoto";
import VideoAndImageFrameWrapperSimple from "@/components/VideoAndImageFrameWrapperSimple";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUp01Icon } from "lucide-react";
import { viewSaveCouplePath } from "@/constants/routes";

type OurAllPhotoProps = {
  AllCoupleImage: ImageResult[];
};

const OurAllCouplePhotos = ({ AllCoupleImage }: OurAllPhotoProps) => {

  return (
    <div>
      {
      !!AllCoupleImage && (
        <div className="w-full px-4 sm:px-6 lg:px-10 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {AllCoupleImage?.map((image) => (
              <div key={image.id} className="w-full">
                <VideoAndImageFrameWrapperSimple
                  title="Our Photo Collections"
                  description="Little moments matter."
                  Footer={<FooterButton path={viewSaveCouplePath(image.id)} />}
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
      )}

      {
       AllCoupleImage.length === 0 && (
            <div className="flex  flex-col items-center justify-center">
                <h1>There is no image!</h1>
                <span className="text-muted-foreground">Please insert the image?</span>
            </div>
        )
      }
    </div>
  );
};

type FooterButtonProps = {
  path: string;
};

const FooterButton = ({ path }: FooterButtonProps) => {
  return (
    <Button variant="link" asChild className="px-0">
      <Link href={path} className="flex items-center gap-2 text-sm">
        <ArrowUp01Icon className="w-4 h-4" />
        View Details
      </Link>
    </Button>
  );
};

export default OurAllCouplePhotos;
