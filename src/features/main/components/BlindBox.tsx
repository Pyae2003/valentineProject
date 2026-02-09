"use client";

import { FallingRain } from "@/features/others/components/FallingRain";
import { FlowerExplosion } from "@/features/others/components/FlowerExplosion";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ValentinePage() {
  const router = useRouter();
  const [explode, setExplode] = useState(false);

  const goDashboard = () => {
    setExplode(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-100 via-rose-200 to-pink-300 flex items-center justify-center px-4">

      {/* Emoji Rain */}
      <FallingRain />

      {/* Explosion */}
      <AnimatePresence>
        {explode && <FlowerExplosion />}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-sm sm:max-w-md md:max-w-lg bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-8 text-center"
      >
        {/* Top rotating emojis */}
        <div className="flex justify-between mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="p-4 bg-pink-200 rounded-full shadow-lg text-2xl"
          >
            🌸
          </motion.div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="p-4 bg-pink-200 rounded-full shadow-lg text-2xl"
          >
            ✨
          </motion.div>
        </div>

        {/* Girl Image */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="mx-auto w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-xl"
        >
          <Image
            src="/kaungmalay3.jpg"
            alt="Kaung Ma Lay"
            width={200}
            height={200}
            className="object-cover"
          />
        </motion.div>

        {/* Caption */}
        <p className="mt-4 text-pink-600 font-medium text-sm sm:text-base">
          My favorite smile in the whole world 💕
        </p>

        {/* Text */}
        <h1 className="mt-6 text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
          Happy Valentine&apos;s Day
          <br /> Kaung Ma Lay
        </h1>

        {/* Button */}
        <button
          onClick={goDashboard}
          className="mt-6 px-6 py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-lg transition active:scale-95"
        >
          Click to go Dashboard 🌸
        </button>
      </motion.div>
    </div>
  );
}