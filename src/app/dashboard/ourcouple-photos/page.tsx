import { loginPath } from "@/constants/routes";
import { getAllCouplePhoto } from "@/features/VideoAndImage/couplephotos/actions/get-allCouplePhoto"
import OurAllCouplePhotos from "@/features/VideoAndImage/couplephotos/components/OurAllCouplePhoto";
import { getSession } from "@/Utils/get-sessions";
import { redirect } from "next/navigation";
import { Heart, Sparkles, Flower2 } from "lucide-react"; 

const page = async () => {
  const allCoupleImage = await getAllCouplePhoto();
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
    <div className="min-h-screen bg-[#fffafa] relative overflow-hidden pb-12">
      
      {/* --- ROMANTIC AMBIANCE ELEMENTS (MOBILE OPTIMIZED) --- */}
      <div className="absolute top-[-5%] left-[-10%] w-64 h-64 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-72 h-72 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />
      
      {/* Decorative Icons */}
      <div className="absolute top-6 left-6 text-rose-200/60 animate-pulse pointer-events-none hidden sm:block">
        <Heart size={40} fill="currentColor" />
      </div>
      <div className="absolute top-24 right-8 text-pink-200/40 animate-bounce pointer-events-none">
        <Flower2 size={30} />
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-12 pt-10 md:pt-20 relative z-10">
        <div className="flex flex-col items-center md:items-start border-b border-rose-100/60 pb-10 mb-10">
          
          {/* Sweet Label */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-rose-400 mb-4 border border-rose-100/50">
            <Heart size={14} className="fill-current animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              Our Sweet Memories
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-800 leading-tight tracking-tight">
                Our <span className="text-rose-500 italic">Sweet</span> Moments
              </h1>
              
              <p className="text-slate-500 font-light italic text-sm md:text-lg max-w-md leading-relaxed mx-auto md:mx-0">
                Every picture tells a story of us. <br className="hidden md:block" /> 
                These are the moments I&apos;ll cherish forever.
              </p>
            </div>

            {/* Total count badge - Clean & Sweet */}
            <div className="flex items-center gap-3 self-center md:self-end bg-white shadow-sm border border-rose-100 px-5 py-3 rounded-2xl transition-transform hover:scale-105">
              <div className="p-2 bg-rose-50 rounded-lg">
                <Sparkles size={18} className="text-rose-400" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider leading-none mb-1">Album Size</p>
                <p className="text-lg font-bold text-slate-700 leading-none">{allCoupleImage?.length || 0} Photos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full relative z-10 px-2 sm:px-0">
        {
          !!session && (
            <OurAllCouplePhotos AllCoupleImage={allCoupleImage} />
          )
        }
      </main>

      {/* Sweet Footer */}
      <footer className="mt-16 py-12 px-6 flex flex-col items-center justify-center">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-px w-8 bg-rose-200" />
          <Heart size={18} className="text-rose-300 fill-rose-100" />
          <div className="h-px w-8 bg-rose-200" />
        </div>
        <p className="text-rose-400/80 text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase mb-2">
          Forever & Always Together
        </p>
        <p className="text-slate-400 font-serif italic text-[11px]">
          Captured with love by us
        </p>
      </footer>
    </div>
  )
}

export default page