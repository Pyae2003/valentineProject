import DeleteSubmitButton from "@/components/DeleteButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ourPhotosPath } from "@/constants/routes";
import { deletePhoto } from "@/features/VideoAndImage/actions/delete-photo";
import { SingleImage } from "@/features/VideoAndImage/actions/get-single";
import { SingleReturn } from "@/types/singleReturnType";
import { Star, Heart, Calendar, ArrowLeft } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";

interface viewsParams {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: viewsParams) => {
  const { id } = await params;
  const imageInfo = await SingleImage({ id });

  if (!imageInfo || !imageInfo.success) {
    return (
      <div className="w-full h-[70vh] flex flex-col items-center justify-center gap-4 px-4">
        <Heart className="text-rose-200 animate-bounce" size={48} />
        <p className="text-rose-400 font-serif italic text-center">This photo is no longer available 💔</p>
        <Link href={ourPhotosPath} className="text-sm text-slate-400 underline">Go Back</Link>
      </div>
    );
  }

  const { title, description, name, url } = imageInfo as SingleReturn;

  return (
    <div className="min-h-screen bg-[#fffafa] py-8 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        
        {/* Image Card */}
        <Card className="overflow-hidden border-none shadow-xl rounded-[2rem] transition-all duration-500 hover:shadow-rose-100 hover:-translate-y-1">
          <CardContent className="p-0">
            <div className="relative w-full aspect-[4/3] sm:aspect-video md:aspect-square lg:aspect-video overflow-hidden bg-rose-50">
              <Image
                src={url}
                fill
                unoptimized
                alt={title || "Memory"}
                className="object-cover rounded-2xl transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-white/80 backdrop-blur-md border-rose-50 shadow-lg rounded-[2rem] p-4 sm:p-6 transition-all duration-300 hover:shadow-xl">
          <CardContent className="flex flex-col space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-rose-50 pb-4 gap-2 sm:gap-0">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-rose-400 font-bold">Title</span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-800">{title}</h2>
              </div>
              <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1 rounded-full text-rose-500 text-sm font-medium">
                <Star className="w-4 h-4 fill-rose-500" />
                {name}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar size={14} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Memory Details</span>
              </div>
              <p className="text-slate-600 leading-relaxed font-light italic text-sm sm:text-base">
                {description}
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row items-center sm:justify-between pt-4 sm:pt-6 border-t border-rose-50 gap-2 sm:gap-0">
            <Button variant="ghost" asChild className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all w-full sm:w-auto">
              <Link href={ourPhotosPath} className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </Button>

            <DeleteButton id={id} />
          </CardFooter>
        </Card>
        
        <div className="text-center">
            <Heart className="mx-auto text-rose-100 fill-rose-50" size={24} />
        </div>
      </div>
    </div>
  );
};

type deleteButtonProp = {
  id: string;
};

const DeleteButton = ({ id }: deleteButtonProp) => {
  return (
    <div className="opacity-60 hover:opacity-100 transition-opacity w-full sm:w-auto">
      <form action={deletePhoto.bind(null, id)} className="w-full sm:w-auto">
        <DeleteSubmitButton  />
      </form>
    </div>
  );
};

export default page;
