export const timeCalculation  = (date : string) => {
    let startDate = new Date(date);

    const objectFormat = startDate.toLocaleDateString("en-GB",{
        day : "2-digit",
        month : "long",
        year : "numeric"
    });
    const now = new Date();
    const diff = now.getTime() - startDate.getTime();
    const second = Math.floor(diff / 1000);
    const minute = Math.floor(second / 60);
    const hours = Math.floor(minute / 60) ;
    const days = Math.floor(hours/24);
    const years = Number(now.getFullYear()) - Number(startDate.getFullYear());

    let months : number = 0;

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + days );

    while(true){
        const nextMonth = new Date(startDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        if(nextMonth <= endDate){
            months += 1;
            startDate = nextMonth;
        }else{
            break;
        }
    };

    console.log(months)


    const minuteText = minute < 10? "0" + minute : minute;
    const secondText = second < 10? "0" + second : second;
    const hoursText = hours < 10? "0" + hours : hours;
    const daysText = days < 10? "0" + days : days;
    const monthsText = months < 10? "0" + months : months;
    const yearsText = years < 10? "0" + years : years;

    return {
        time : `' ${hoursText} '  Hours :: ' ${minuteText} '  Minutes :: ' ${secondText} '  second `,
        hours : `${hoursText}`,
        days : `${daysText}`,
        months : `${monthsText}`,
        years : `${yearsText}`,
        objectFormat
    }
}