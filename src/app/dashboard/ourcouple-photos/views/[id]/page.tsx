
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { loginPath, ourCouplePhotoPath } from "@/constants/routes";
import { deleteCouplePhoto } from "@/features/VideoAndImage/couplephotos/actions/delete-couplePhoto";
import { coupleSingleImage } from "@/features/VideoAndImage/couplephotos/actions/get-coupleSingle";
import { SingleReturn } from "@/types/singleReturnType";
import { getSession } from "@/Utils/get-sessions";
import { ArrowLeft, Calendar, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface viewsParams {
  params: Promise<{ id: string }>;
}

// ✅ DeleteSubmitButton with children & className props
type DeleteSubmitButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

const DeleteSubmitButton = ({ className, children }: DeleteSubmitButtonProps) => {
  return (
    <button type="submit" className={className}>
      {children || "Delete"}
    </button>
  );
};

const page = async ({ params }: viewsParams) => {
  const { id } = await params;

  const imageInfo = await coupleSingleImage({ id });

  const session = await getSession();

  if (!session) {
    redirect(loginPath);
  }

  if (!imageInfo || !imageInfo.success) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
        <Heart className="text-rose-200 animate-bounce" size={48} />
        <p className="text-rose-400 font-serif italic text-center">
          This photo is no longer available 💔
        </p>
        <Link
          href={ourCouplePhotoPath}
          className="text-sm text-slate-400 underline"
        >
          Go Back
        </Link>
      </div>
    );
  }

  const { title, description, name, url } = imageInfo as SingleReturn;

  return (
    <div className="min-h-screen bg-[#fffafa] py-8 px-4 flex items-center justify-center relative overflow-hidden">
      
      {/* Floating Hearts */}
      <Heart className="absolute top-10 left-5 text-rose-200 animate-bounce text-2xl" />
      <Heart className="absolute top-32 right-10 text-rose-300 animate-bounce text-3xl" />
      <Heart className="absolute bottom-20 left-20 text-rose-100 animate-bounce text-2xl" />

      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Image Card */}
        <Card className="overflow-hidden border-none shadow-xl rounded-2xl transition-all duration-500 hover:shadow-rose-100 hover:-translate-y-1">
          <CardContent className="p-0">
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-video lg:aspect-video overflow-hidden bg-rose-50 rounded-2xl">
              <Image
                src={url}
                fill
                unoptimized
                alt={title || "Memory"}
                className="object-cover transition-transform duration-700 hover:scale-105 rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-white/80 backdrop-blur-md border-rose-50 shadow-lg rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:shadow-xl">
          <CardContent className="flex flex-col space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-rose-50 pb-4 gap-4 sm:gap-0">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">
                  Title
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-800">
                  {title}
                </h2>
              </div>
              <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-full text-rose-500 text-sm font-medium">
                <Star className="w-4 h-4 fill-rose-500" />
                {name}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar size={14} />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  Memory Details
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed font-light italic break-words">
                {description}
              </p>
            </div>
          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-rose-50 gap-4 sm:gap-0">
            <Button
              variant="ghost"
              asChild
              className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all w-full sm:w-auto"
            >
              <Link
                href={ourCouplePhotoPath}
                className="flex items-center gap-2 justify-center w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </Button>

            {/* Delete Button */}
            <DeleteButton id={id} />
          </CardFooter>
        </Card>

        {/* Decorative Heart */}
        <div className="text-center mt-4">
          <Heart className="mx-auto text-rose-100 fill-rose-50 animate-bounce" size={24} />
        </div>
      </div>
    </div>
  );
};

// DeleteButton component
type deleteButtonProp = {
  id: string;
};

const DeleteButton = ({ id }: deleteButtonProp) => {
  return (
    <div className="opacity-60 hover:opacity-100 transition-opacity w-full sm:w-auto">
      <form action={deleteCouplePhoto.bind(null, id)} className="w-full sm:w-auto">
        <DeleteSubmitButton
          className="bg-red-400 hover:bg-red-600 text-white shadow-lg rounded-lg hover:scale-105 transition-transform duration-300 w-full sm:w-auto flex items-center justify-center py-2"
        >
          💔 Delete
        </DeleteSubmitButton>
      </form>
    </div>
  );
};

export default page;
