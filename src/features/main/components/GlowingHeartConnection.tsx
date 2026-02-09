"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

interface Props {
  leftName: string;
  rightName: string;
  boyUrl: string;
  girlUrl: string;
}

export default function GlowingHeartConnection({
  leftName,
  rightName,
  boyUrl,
  girlUrl,
}: Props) {
  // Animation flickering မဖြစ်အောင် mounting check လုပ်ခြင်း
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <style jsx global>{`
        /* Center Heart Glow - Static shadow for immediate load */
        .heart-base-glow {
          filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.5));
        }

        @keyframes heartPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px #f472b6); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 20px #ec4899); }
        }

        /* Flowing Stream Animation */
        @keyframes streamToCenter {
          0% { offset-distance: 0%; opacity: 0; transform: scale(0.6); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; transform: scale(0.6); }
        }

        .animate-center-heart {
          animation: heartPulse 2s ease-in-out infinite;
        }

        .heart-stream {
          position: absolute;
          animation: streamToCenter 3s linear infinite;
          /* CSS Motion Path for better control */
        }
        
        /* Mobile specific animation adjustment */
        @keyframes flowMobileRight {
          0% { transform: translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(60px); opacity: 0; }
        }
        @keyframes flowMobileLeft {
          0% { transform: translateX(20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-60px); opacity: 0; }
        }

        .m-flow-right { animation: flowMobileRight 2.5s linear infinite; }
        .m-flow-left { animation: flowMobileLeft 2.5s linear infinite; }
      `}</style>

      <section className="w-full flex items-center justify-center px-1 py-12 gap-0 sm:gap-4 max-w-lg mx-auto overflow-visible">
        
        {/* LEFT PROFILE */}
        <Profile img={boyUrl} name={leftName} isLeft={true} />

        {/* LEFT LINE */}
        <div className="relative flex-1 h-[2px] bg-gradient-to-r from-pink-300/20 to-pink-400">
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart size={12} className="text-pink-500 fill-pink-500 m-flow-right" style={{ animationDelay: '0s' }} />
            <Heart size={10} className="text-pink-400 fill-pink-400 m-flow-right" style={{ animationDelay: '1.2s' }} />
          </div>
        </div>

        {/* CENTER HEART UNIT */}
        <div className="relative flex items-center justify-center shrink-0 z-10 px-1">
          <div className="absolute w-14 h-14 md:w-20 md:h-20 bg-pink-400/20 rounded-full blur-xl" />
          <div className="relative bg-white p-3 md:p-5 rounded-full border-2 border-pink-100 shadow-lg animate-center-heart">
            <Heart className="w-6 h-6 md:w-10 md:h-10 text-pink-500 fill-pink-500" />
            <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* RIGHT LINE */}
        <div className="relative flex-1 h-[2px] bg-gradient-to-l from-pink-300/20 to-pink-400">
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart size={12} className="text-pink-500 fill-pink-500 m-flow-left" style={{ animationDelay: '0.6s' }} />
            <Heart size={10} className="text-pink-400 fill-pink-400 m-flow-left" style={{ animationDelay: '1.8s' }} />
          </div>
        </div>

        {/* RIGHT PROFILE */}
        <Profile img={girlUrl} name={rightName} isLeft={false} />
      </section>
    </>
  );
}

function Profile({ img, name, isLeft }: { img: string; name: string; isLeft: boolean }) {
  return (
    <div className="flex flex-col items-center shrink-0 z-20">
      {/* Circle Container - Responsive sizes */}
      <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 aspect-square">
        <div className="w-full h-full rounded-full p-0.5 bg-gradient-to-tr from-pink-500 to-rose-300">
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm">
            <Image 
              src={img} 
              alt={name} 
              fill 
              className="object-cover"
              priority 
              unoptimized // Animation glitch ကင်းစေရန်
            />
          </div>
        </div>
        {/* Little status dot */}
        <div className={`absolute bottom-1 ${isLeft ? 'right-0' : 'left-0'} w-3 h-3 bg-green-500 border-2 border-white rounded-full`} />
      </div>

      {/* Name Tag */}
      <div className="mt-2 max-w-[70px] sm:max-w-none">
        <p className="text-[9px] sm:text-xs font-bold text-pink-700 bg-white/90 px-2 py-0.5 rounded-full shadow-sm border border-pink-100 truncate text-center uppercase tracking-tighter">
          {name}
        </p>
      </div>
    </div>
  );
}