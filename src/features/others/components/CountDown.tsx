"use client"

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

      const { time, days, months, years, objectFormat } = timeCalculation("May 20,2024 23:59");

      setTimeDiff({ time , days, months, years, objectFormat });

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div>
      <div className="flex items-center justify-center ">
        <div className="bg-pink-100 backdrop-blur-lg w-90 border border-white/30 rounded-2xl p-8 text-center shadow-lg md:w-180">
          <h2 className="text-2xl font-semibold mb-4">💗 Together For</h2>

          <div className="flex justify-between text-pink-500 font-bold text-3xl mb-2">
            <div>
              {timeDiff.years}
              <div className="text-sm font-normal text-pink-700">Years</div>
            </div>
            <Separator orientation="vertical" />
            <div>
              {timeDiff.months}
              <div className="text-sm font-normal text-pink-700">months</div>
            </div>
            <Separator orientation="vertical" />
            <div>
              {timeDiff.days}
              <div className="text-sm font-normal text-pink-700">days</div>
            </div>
          </div>
          <div>
            <p className="text-sm text-pink-500">{timeDiff.time}</p>
          </div>
          <p className=" mt-4 text-sm text-pink-700">
            Since {`${timeDiff.objectFormat}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountDown;
