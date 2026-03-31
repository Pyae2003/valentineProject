"use client";

import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { OurDate } from "@/generated/prisma/client";
import Link from "next/link";
import { editAnniDate } from "@/constants/routes";
import { timeCalculation } from "@/lib/timeCalculation";

const CountDown = ({days,months,year} : OurDate) => {
  const [timeDiff, setTimeDiff] = useState({
    days: "0",
    months: "0",
    year: "0",
    objectFormats: "0",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const { realDays, realMonths, realYear, objectFormats } = timeCalculation(
        `${year.toString()}-${months.toString()}-${days.toString()}`
      );

      if( !realDays || !realMonths || !realYear ){
        return;
      }
      setTimeDiff({  days : realDays, months : realMonths, year : realYear, objectFormats });
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
            {timeDiff.year}
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

        <p className="mt-4 text-xs sm:text-sm text-pink-700">
          Since <span className="font-medium">{timeDiff.objectFormats}</span>
        </p>
        <div className="mt-4">
        <Button className="bg-pink-700 hover:bg-pink-200" >
          <Link href={editAnniDate}>
            Edit Anni Date
          </Link>
        </Button>
        </div>
      </div>
    </div>
  );
};

export default CountDown;

