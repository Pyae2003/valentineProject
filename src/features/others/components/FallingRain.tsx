"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const emojis = ["🌟", "✨", "⭐", "💖", "🌸","🍀","🐋","☀️"];

type RainItem = {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
  sway: number;
  rotate: number;
};

export const FallingRain = () => {
  const [items] = useState<RainItem[]>(() =>
    Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 18 + Math.random() * 26,
      duration: 8 + Math.random() * 6,
      delay: Math.random() * 5,
      emoji: emojis[i % emojis.length],
      sway: (Math.random() - 0.5) * 120,
      rotate: Math.random() * 360,
    }))
  );

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-30">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            y: "-20vh",  // top of viewport
            x: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: "120vh",  // bottom of viewport
            x: item.sway,
            opacity: [0, 1, 1, 0],
            rotate: item.rotate,
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear",
          }}
          className="absolute select-none will-change-transform"
          style={{
            left: `${item.left}vw`,       // ✅ FIXED
            fontSize: `${item.size}px`,   // ✅ FIXED
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};
