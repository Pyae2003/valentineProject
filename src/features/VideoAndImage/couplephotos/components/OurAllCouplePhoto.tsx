import React from "react";
import { ImageResult } from "../actions/get-allCouplePhoto";
import VideoAndImageFrameWrapperSimple from "@/components/VideoAndImageFrameWrapperSimple";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUp01Icon, Heart } from "lucide-react";
import { viewSaveCouplePath } from "@/constants/routes";

type OurAllPhotoProps = {
  AllCoupleImage: ImageResult[];
};

const OurAllCouplePhotos = ({ AllCoupleImage }: OurAllPhotoProps) => {

  return (
    <div className="w-full bg-slate-50/50">
      {!!AllCoupleImage && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
          {/* Responsive Grid System: 
              Mobile: 1 col, Tablet: 2 cols, Laptop: 3 cols, Large Desktop: 4 cols */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {AllCoupleImage?.map((image) => (
              <div 
                key={image.id} 
                className="group relative bg-white rounded-2xl p-3 shadow-sm border border-rose-100/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Image Wrapper */}
                <VideoAndImageFrameWrapperSimple
                  title="Our Collections"
                  description="Little moments matter."
                  Footer={<FooterButton path={viewSaveCouplePath(image.id)} />}
                >
                  <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[3/4] overflow-hidden rounded-xl bg-rose-50">
                    <Image
                      src={image.url ?? ""}
                      fill
                      unoptimized
                      alt="Couple memory"
                      className="object-cover"
                    />
                    {/* Soft Hover Overlay */}
                    <div className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </VideoAndImageFrameWrapperSimple>

                {/* Corner Decorative Heart */}
                <div className="absolute top-5 right-5 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {AllCoupleImage.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-6 text-center">
          <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
            <Heart className="text-rose-200" size={32} />
          </div>
          <h1 className="text-xl font-medium text-slate-700">No images found!</h1>
          <span className="text-muted-foreground mt-2">တို့နှစ်ယောက်ရဲ့ အမှတ်တရပုံလေးတွေ ထည့်ရအောင်။</span>
        </div>
      )}
    </div>
  );
};

type FooterButtonProps = {
  path: string;
};

const FooterButton = ({ path }: FooterButtonProps) => {
  return (
    <Button 
      variant="link" 
      asChild 
      className="px-0 h-auto py-2 text-rose-500 hover:text-rose-600 font-semibold"
    >
      <Link href={path} className="flex items-center gap-1.5 text-sm group/link">
        View Details
        <ArrowUp01Icon className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5" />
      </Link>
    </Button>
  );
};

export default OurAllCouplePhotos;