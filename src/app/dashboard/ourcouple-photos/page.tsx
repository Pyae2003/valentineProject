import { loginPath } from "@/constants/routes";
import { getAllCouplePhoto } from "@/features/VideoAndImage/couplephotos/actions/get-allCouplePhoto";
import OurAllCouplePhotos from "@/features/VideoAndImage/couplephotos/components/OurAllCouplePhoto";
import { getSession } from "@/Utils/get-sessions";
import { redirect } from "next/navigation";
import { Heart, Sparkles } from "lucide-react";

const Page = async () => {
  const allCoupleImage = await getAllCouplePhoto();
  let session = null;

  try {
    session = await getSession();
  } catch (error) {
    console.error("Session error:", error);
  }

  if (!session) redirect(loginPath);

  return (
    <div className="min-h-screen w-full bg-[#fffafa] overflow-x-hidden relative">
      
      {/* Soft background blobs */}
      <div className="absolute -top-24 -left-32 w-40 h-40 sm:w-64 sm:h-64 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-32 w-44 h-44 sm:w-72 sm:h-72 bg-pink-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="w-full md:max-w-5xl md:mx-auto px-3 sm:px-4 pt-8 md:pt-16 relative z-10">

        {/* HEADER */}
        <header className="flex flex-col items-center text-center border-b border-rose-100/60 pb-8 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-rose-100 mb-6">
            <Heart size={14} className="text-rose-400 fill-rose-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-rose-400 uppercase">
              Our Journey
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-slate-800">
            Our <span className="text-rose-500 italic">Sweet</span> Moments
          </h1>

          <p className="mt-4 text-slate-500 italic text-sm sm:text-base max-w-md">
            Every picture tells a story of us. These are the moments I&apos;ll cherish forever.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-rose-500 bg-rose-50/50 px-4 py-2 rounded-2xl border border-rose-100">
            <Sparkles size={16} />
            <span className="text-sm font-semibold">
              {allCoupleImage?.length || 0} Photos
            </span>
          </div>
        </header>

        {/* PHOTO FEED */}
        <main className="w-full">
          <OurAllCouplePhotos AllCoupleImage={allCoupleImage} />
        </main>

        {/* FOOTER */}
        <footer className="mt-12 py-8 text-center border-t border-rose-100/40">
          <p className="text-rose-400 text-[10px] font-semibold tracking-[0.3em] uppercase">
            Forever & Always Together
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Page;
