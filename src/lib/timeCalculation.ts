
import { intervalToDuration } from "date-fns"
export const timeCalculation =  (date: string) => {
  const startDate = new Date(date);
  const now = new Date();

  const duration = intervalToDuration({
    start : startDate,
    end : now
  });

  const objectFormats = startDate.toLocaleDateString("en-GB",{
    day : "2-digit",
    month : "long",
    year : "numeric"
  });

  
  const years = duration.years !== undefined ? duration.years.toString() : "00";
  console.log(years)


  return {
    realYear : years,
    realMonths : duration.months?.toString(),
    realDays : duration.days?.toString(),
    objectFormats
  };
};
