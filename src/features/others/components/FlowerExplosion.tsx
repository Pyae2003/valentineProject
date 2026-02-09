"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Flower = {
  id: number;
  x: number;
  y: number;
};

export const FlowerExplosion = () => {
  // Lazy initialization: runs once, before first render
  const [flowers] = useState<Flower[]>(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 700,
      y: (Math.random() - 0.5) * 700,
    }))
  );

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: 1,
            x: flower.x,
            y: flower.y,
            opacity: 0,
          }}
          transition={{ duration: 3 }}
          className="absolute text-3xl"
        >
          🌸🌼
        </motion.div>
      ))}
    </div>
  );
};
