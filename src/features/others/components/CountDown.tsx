"use client";

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { timeCalculation } from "../actions";

const CountDown = () => {
  const [timeDiff, setTimeDiff] = useState({
    time: "0",
    days: "0",
    months: "0",
    years: "0",
    objectFormat: "0",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { time, days, months, years, objectFormat } = timeCalculation(
        "January 10,2026 13:34:33"
      );
      setTimeDiff({ time, days, months, years, objectFormat });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center px-4 mt-6">
      <div
        className="
          bg-pink-100 backdrop-blur-lg
          dark:bg-pink-900/40
          border border-white/30
          rounded-2xl p-6 sm:p-8
          w-full max-w-xs sm:max-w-sm md:max-w-md
          shadow-lg
          text-center
          transition-all duration-300
        "
      >
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">💗 Together For</h2>

        <div className="flex justify-between text-pink-500 font-bold text-2xl sm:text-3xl mb-2">
          <div className="flex flex-col items-center">
            {timeDiff.years}
            <span className="text-xs sm:text-sm font-normal text-pink-700">Years</span>
          </div>

          <Separator orientation="vertical" className="h-12 sm:h-16 mx-2 sm:mx-4" />

          <div className="flex flex-col items-center">
            {timeDiff.months}
            <span className="text-xs sm:text-sm font-normal text-pink-700">Months</span>
          </div>

          <Separator orientation="vertical" className="h-12 sm:h-16 mx-2 sm:mx-4" />

          <div className="flex flex-col items-center">
            {timeDiff.days}
            <span className="text-xs sm:text-sm font-normal text-pink-700">Days</span>
          </div>
        </div>

        <div>
          <p className="text-xs sm:text-sm text-pink-500">{timeDiff.time}</p>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-pink-700">
          Since <span className="font-medium">{timeDiff.objectFormat}</span>
        </p>
      </div>
    </div>
  );
};

export default CountDown;

