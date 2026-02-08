"use client";

import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react"; // npm install lucide-react
import { Toggle } from "@/components/ui/toggle";

interface Props {
  leftName: string;
  rightName: string;
  boyUrl :string,
  girlUrl : string
  
}

const GlowingHeartConnection: React.FC<Props> = ({
  leftName,
  rightName,
  boyUrl,
  girlUrl
}) => {
  return (
    <>
      {/* Custom CSS for Flow Animation 
        - လိုင်းစီးဆင်းတဲ့ Effect အတွက် Keyframes
      */}
      <style jsx>{`
        @keyframes move {
          0% {
            transform: translateX(-100%);
            opacity : 0;
          }
          30% {
            opacity : 1;
          }
            100%{
            transform : translateX(300%);
            opacity : 0;
            }
        }
        @keyframes rightmove {
          0% {
            transform: translateX(300%);
            opacity : 0;
          }
          30% {
            opacity : 1;
          }
            100%{
            transform : translateX(-200%);
            opacity : 0;
            }
        }
        .animate-flow-line {
          background-size: 200% 100%;
          animation: move 3s linear infinite;
        }
        .animate-right-flow-line {
          background-size: 200% 200%;
          animation: rightmove 3s linear infinite;
        }
        /* အလင်းဖြာထွက်ပြီး မှိတ်တုတ်မှိတ်တုတ်ဖြစ်မယ့် Effect */
        @keyframes softGlow {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }
        .animate-soft-glow {
          animation: softGlow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center w-full py-10">
        <div className="flex items-center justify-center w-full max-w-4xl px-4 gap-0 sm:gap-2">
          {/* =======================
              LEFT PROFILE SECTION 
             ======================= */}
          <div className="flex flex-col items-center gap-3 relative z-10 shrink-0">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-pink-300 to-pink-100 shadow-lg">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={boyUrl}
                  alt={leftName}
                  unoptimized
                  fill
                  className="object-cover mb-2"
                />
              </div>
            </div>
            <Toggle className="text-sm sm:text-base font-bold text-pink-600 absolute -bottom-8 whitespace-nowra">
              {" "}
              🌼 {leftName}
            </Toggle>
          </div>

          <div className="flex-1 h-2 w-8 md:h-[15px] bg-pink-100 rounded-full mx-2 sm:mx-4  overflow-hidden relative shadow-inner">
            <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent bg-pink-500 via-pink-500 to-transparent animate-flow-line"></div>
          </div>

          <div className="relative flex items-center justify-center shrink-0 mx-2">
            <div className="absolute w-20 h-20 bg-pink-500 rounded-full blur-2xl animate-soft-glow opacity-60"></div>

            <div className="relative z-10 bg-white p-4 rounded-full shadow-xl border-4 border-pink-50">
              <Heart
                className="w-8 h-8 sm:w-10 sm:h-10 text-pink-600 fill-pink-600"
                strokeWidth={1}
              />
            </div>
          </div>

          <div className="flex-1 h-2 w-8 md:h-[15px] bg-pink-100 rounded-full mx-2 sm:mx-4 overflow-hidden relative shadow-inner">
            <div className="absolute top-0 right-0 h-full w-1/3 bg-linear-to-r from-transparent bg-pink-600  via-pink-500 to-transparent  animate-right-flow-line"></div>
          </div>

          <div className="flex flex-col items-center gap-3 relative z-10 shrink-0">
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-bl from-pink-300 to-pink-100 shadow-lg">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
                <Image
                  src={girlUrl}
                  alt={rightName}
                  unoptimized
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <Toggle className="text-sm sm:text-base font-bold text-pink-600 absolute -bottom-8 whitespace-nowra">
              {" "}
              🌼 {rightName}
            </Toggle>
          </div>
        </div>
      </div>
    </>
  );
};
export default GlowingHeartConnection;
