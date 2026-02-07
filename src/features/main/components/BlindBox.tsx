"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function ValentineSurprise() {
  const router = useRouter();
  const [isExploded, setIsExploded] = useState(false);
  const [showText, setShowText] = useState(false);

  // Dashboard သို့သွားရန် Function
  const handleNavigate = () => {
    if (isExploded) {
      router.push("/dashboard"); // ဒီနေရာမှာ မိမိ dashboard route ကို ထည့်ပါ
    }
  };

  // ဗုံးနှိပ်လိုက်တဲ့အခါ လုပ်မည့် Function
  const handleExplosion = (e: React.MouseEvent) => {
    e.stopPropagation(); // Parent click ကို မထိအောင် တားပါမယ်
    if (isExploded) return;

    setIsExploded(true);

    // ၁. Confetti (ပန်းတွေ ကြယ်တွေ အပေါ်ကကျလာမယ့် Effect)
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0 }, // ဘယ်ဘက်အပေါ်
        colors: [
          "#ff0000",
          "#ff69b4",
          "#ffd700",
          "008000",
          "FFFF00",
          "0000FF",
          "87CEEB",
        ], // အနီ၊ ပန်းရောင်၊ ရွှေရောင်
        shapes: ["star", "circle", "square"], // ကြယ်နဲ့ ပန်းပုံစံ (စက်ဝိုင်း)
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0 }, // ညာဘက်အပေါ်
        colors: ["#ff0000", "#ff69b4", "#ffd700"],
        shapes: ["star", "circle"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // ၂. အလင်းရောင်ထွက်ပြီး စာပေါ်လာဖို့ အချိန်ခဏစောင့်မယ်
    setTimeout(() => {
      setShowText(true);
    }, 500);
  };

  return (
    <div
      onClick={handleNavigate}
      className={`mt-10 rounded-e-4xl relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-prink-800  duration-1000 ${
        isExploded ? "cursor-pointer" : ""
      }`}
    >
      {/* Background Glow Effect (ဗုံးပေါက်မှ ပေါ်လာမယ်) */}
      <AnimatePresence>
        {isExploded && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 3 }}
            className="absolute inset-0 z-0 bg-gradient-to-r from-pink-500/30 via-red-500/30 to-purple-500/30 blur-3xl"
          />
        )}
      </AnimatePresence>

      <div className="z-10 flex flex-col items-center gap-8">
        {/* ဗုံး Icon (Blinkbox) */}
        <AnimatePresence mode="wait">
          {!isExploded ? (
            <motion.div
              key="box"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              // ခုန်နေတဲ့ Animation (Bouncing/Blinking)
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
                filter: [
                  "drop-shadow(0 0 0px #ff0000)",
                  "drop-shadow(0 0 10px #ff0000)",
                  "drop-shadow(0 0 0px #ff0000)",
                ],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onClick={handleExplosion}
              className="flex flex-column gap-2 items-center cursor-pointer rounded-full bg-pink-200 p-8 shadow-2xl border-2 border-pink-600/50"
            >
              <p className="text-4xl">🌷</p>
              <p className="mt-2  text-lg text-pink-500 text-center font-mono">
                🌸 Tap Me
              </p>
            </motion.div>
          ) : (
            // ဗုံးပေါက်ပြီးနောက် ပြမည့် Icon (Opened Box / Sparkles)

            <div className="flex justify-between relative">
              <motion.div
                key="explosion"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className=" relative rounded-full bg-pink-100 p-8 shadow-[0_0_50px_rgba(255,105,180,0.6)]"
              >

                <p className="text-8xl bg-pink-100">🐋</p>
              </motion.div>
              <motion.div
                key="explosion1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: 360 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className=" relative rounded-full bg-pink-100 p-8 shadow-[0_0_50px_rgba(255,105,180,0.6)]"
              >
                <div className="absolute top-3 right-3 ">
                  <p className="text-6xl">🌼</p>
                </div>

                <p className="text-8xl bg-pink-100">🐳</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Happy Valentine's Day စာသား */}
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center"
            >
              <h1 className="bg-gradient-to-r from-red-400 via-pink-500 bg-clip-text text-3xl font-extrabold text-pink-500 md:text-3xl drop-shadow-sm">
                Happy Valentine&apos;s Da Par
                <br /> Kaung Ma Lay
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-4 text-lg text-pink-300"
              >
                Click anywhere to go to your dashboard ✨
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
