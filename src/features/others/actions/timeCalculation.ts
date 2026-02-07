
export const timeCalculation =  (date: string) => {
  const startDate = new Date(date);
  const now = new Date();

  const objectFormat = startDate.toLocaleDateString("en-GB",{
    day : "2-digit",
    month : "long",
    year : "numeric"
  })
  const diffMs = now.getTime() - startDate.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // ✅ month calculation
  let months = 0;
  let tempDate = new Date(startDate);

  while (true) {
    const nextMonth = new Date(tempDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    if (nextMonth <= now) {
      months++;
      tempDate = nextMonth;
    } else {
      break;
    }
  };

  const years = Math.floor(months/12);
  const yearsAndMonth = (months % 12);
  const secondText = seconds < 10 ? "0" + seconds : seconds;
  const minuteText = minutes < 10 ? "0" + minutes : minutes ; 
  const hoursText = hours < 10 ? "0" + hours : hours ; 
  const daysText = days < 10 ? "0" + days : days ; 
  const monthText = months < 10 ? "0" + months : months ; 
  const yearsText = years < 10 ? "0" + years : years ; 

  return {
    time  : `${hoursText} "hours" :: ${minuteText} "minutes" :: ${secondText} "second`,
    days : `${daysText}`,
    months : `${monthText}`,
    years : `${yearsText}`,
    yearsAndMonth,
    objectFormat
  };
};
