import { loginPath } from "@/constants/routes";
import { getAllSoloPhoto } from "@/features/VideoAndImage/actions/get-allPhoto"
import OurAllPhotos from "@/features/VideoAndImage/components/OurAllPhotos"
import { getSession } from "@/Utils/get-sessions";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react"; // Heart icon လေး သုံးဖို့ ထည့်လိုက်ပါတယ်

const page = async () => {
    const allImage = await getAllSoloPhoto();
    let session = null;

    try {
      session = await getSession();
    } catch (error) {
      console.error("Session error:", error);
    }
  
    if (!session) {
      redirect(loginPath);
    };
    
  return (
    <div className="w-full mt-10 min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-100 via-slate-50 to-white">
      <div className="max-w-4xl mx-auto text-center px-4 mb-12 space-y-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Heart className="text-rose-400 fill-rose-400 animate-pulse" size={20} />
          <span className="text-rose-400 font-medium tracking-widest uppercase text-xs">Our Precious Memories</span>
          <Heart className="text-rose-400 fill-rose-400 animate-pulse" size={20} />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 tracking-tight">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-500">Solo Moments</span>
        </h1>
        
        <div className="relative">
          <p className="text-slate-500 font-light italic text-lg max-w-lg mx-auto leading-relaxed">
          You are amazing in so many ways—kind, thoughtful, and full of smiles.  
          </p>
          <div className="mt-6 flex justify-center items-center gap-4">
            <div className="h-[1px] w-12 bg-rose-200"></div>
            <Heart className="text-rose-300" size={14} />
            <div className="h-[1px] w-12 bg-rose-200"></div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto">
        {
          !!session && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <OurAllPhotos AllImage={allImage}/>
            </div>
          )
        }
      </div>

      <footer className="py-20 text-center">
        <p className="text-rose-300 text-sm font-light">Made with love for my girl ✨</p>
      </footer>
    </div>
  )
}

export default page