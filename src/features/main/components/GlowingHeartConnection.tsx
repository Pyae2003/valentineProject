"use client";

import React from "react";
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
  return (
    <>
      <style jsx global>{`
        /* အလယ်အသဲ Glow - Scale နဲ့ Filter ကို သုံးထားပါတယ် */
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px #f472b6); }
          50% { transform: scale(1.1); filter: drop-shadow(0 0 15px #ec4899); }
        }

        /* ဘယ်ဘက်မှ အလယ်သို့ အသဲမြှားစီးဆင်းမှု */
        @keyframes flowRight {
          0% { left: 0%; opacity: 0; transform: translateY(-50%) scale(0.5); }
          20% { opacity: 1; transform: translateY(-50%) scale(1); }
          80% { opacity: 1; transform: translateY(-50%) scale(1); }
          100% { left: 100%; opacity: 0; transform: translateY(-50%) scale(0.5); }
        }

        /* ညာဘက်မှ အလယ်သို့ အသဲမြှားစီးဆင်းမှု */
        @keyframes flowLeft {
          0% { right: 0%; opacity: 0; transform: translateY(-50%) scale(0.5); }
          20% { opacity: 1; transform: translateY(-50%) scale(1); }
          80% { opacity: 1; transform: translateY(-50%) scale(1); }
          100% { right: 100%; opacity: 0; transform: translateY(-50%) scale(0.5); }
        }

        .animate-center-heart {
          animation: heartPulse 2s ease-in-out infinite both;
        }

        .heart-stream-right {
          position: absolute;
          top: 50%;
          animation: flowRight 3s linear infinite both;
        }

        .heart-stream-left {
          position: absolute;
          top: 50%;
          animation: flowLeft 3s linear infinite both;
        }
      `}</style>

      {/* Main Container - Mobile Responsive */}
      <section className="w-full flex items-center justify-between px-2 py-10 max-w-lg mx-auto overflow-hidden">
        
        {/* LEFT PROFILE */}
        <Profile img={boyUrl} name={leftName} />

        {/* LEFT LINE AREA */}
        <div className="relative flex-1 h-[2px] bg-pink-100 mx-1">
          <Heart size={14} className="text-pink-500 fill-pink-500 heart-stream-right" style={{ animationDelay: '0s' }} />
          <Heart size={10} className="text-pink-400 fill-pink-400 heart-stream-right" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* CENTER HEART */}
        <div className="relative flex items-center justify-center shrink-0">
          <div className="absolute w-12 h-12 bg-pink-400/20 rounded-full blur-xl" />
          <div className="relative bg-white p-3 rounded-full border-2 border-pink-50 shadow-md animate-center-heart">
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* RIGHT LINE AREA */}
        <div className="relative flex-1 h-[2px] bg-pink-100 mx-1">
          <Heart size={14} className="text-pink-500 fill-pink-500 heart-stream-left" style={{ animationDelay: '0.7s' }} />
          <Heart size={10} className="text-pink-400 fill-pink-400 heart-stream-left" style={{ animationDelay: '2.2s' }} />
        </div>

        {/* RIGHT PROFILE */}
        <Profile img={girlUrl} name={rightName} />
      </section>
    </>
  );
}

function Profile({ img, name }: { img: string; name: string }) {
  return (
    <div className="flex flex-col items-center shrink-0">
      {/* Profile Image - Always Circle */}
      <div className="relative w-14 h-14 sm:w-25 sm:h-25 aspect-square rounded-full p-0.5 bg-gradient-to-tr from-pink-400 to-rose-300">
        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm">
          <Image 
            src={img} 
            alt={name} 
            fill 
            className="object-cover"
            priority 
          />
        </div>
      </div>
      {/* Name Tag */}
      <p className="mt-1 text-[9px] font-bold text-pink-600 bg-white/80 px-2 py-0.5 rounded-full border border-pink-100 uppercase truncate max-w-[65px]">
        {name}
      </p>
    </div>
  );
}