import { loginPath } from "@/constants/routes";
import { getAllCouplePhoto } from "@/features/VideoAndImage/couplephotos/actions/get-allCouplePhoto"
import OurAllCouplePhotos from "@/features/VideoAndImage/couplephotos/components/OurAllCouplePhoto";
import { getSession } from "@/Utils/get-sessions";
import { redirect } from "next/navigation";
import { Heart } from "lucide-react"; // Heart icon လေး သုံးဖို့ ထည့်လိုက်ပါတယ်

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
    <div className="min-h-screen bg-[#fffafa] pt-12 md:pt-20 pb-10">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10 md:mb-16 text-center md:text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rose-100 pb-8">
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2 text-rose-400">
              <Heart size={18} className="fill-current" />
              <span className="text-xs font-bold uppercase tracking-widest">Our Story</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-800">
              Our <span className="text-rose-500">Couple</span> Moments
            </h1>
            <p className="text-slate-500 font-light italic text-sm md:text-base max-w-md">
              Every picture tells a story of us. These are the moments I&aposll cherish forever.
            </p>
          </div>
          
          <div className="hidden md:block">
            <span className="text-slate-400 text-sm font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-rose-50">
              Total {allCoupleImage?.length || 0} Memories
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="w-full">
        {
          !!session && (
            <OurAllCouplePhotos AllCoupleImage={allCoupleImage} />
          )
        }
      </main>

      {/* Page Footer */}
      <footer className="mt-20 py-10 text-center border-t border-rose-50">
        <p className="text-rose-300 text-xs tracking-tighter uppercase">
          Forever & Always • Valentine Edition
        </p>
      </footer>
    </div>
  )
}

export default page