import React from "react";
import VideoAndImageFrameWrapperSimple from "@/components/VideoAndImageFrameWrapperSimple";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react"; // Heart icon ထပ်ထည့်ထားတယ်
import { viewPath } from "@/constants/routes";
import { ImageResult } from "../actions/get-allPhoto";

type OurAllPhotoProps = {
  AllImage: ImageResult[];
};

const OurAllPhotos = ({ AllImage }: OurAllPhotoProps) => {
  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-10 py-12 min-h-screen bg-gradient-to-b from-rose-50 to-white overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <Heart className="absolute top-10 left-[10%] text-pink-300 animate-bounce" size={24} />
        <Heart className="absolute top-40 right-[15%] text-rose-300 animate-pulse" size={32} />
        <Heart className="absolute bottom-20 left-[20%] text-pink-200 animate-bounce" size={20} />
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {AllImage?.map((image) => (
          <div 
            key={image.id} 
            className="w-full group transition-all duration-500 hover:-translate-y-2"
          >
            <div className="rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_0_25px_rgba(244,114,182,0.4)]">
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
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </VideoAndImageFrameWrapperSimple>
            </div>
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
    <Button 
      variant="default" 
      asChild 
      className="w-full bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white border-none shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
    >
      <Link href={path} className="flex items-center justify-center gap-2 text-sm font-medium">
        <Heart className="w-4 h-4 fill-current" /> 
         View Detail
      </Link>
    </Button>
  );
};

export default OurAllPhotos;