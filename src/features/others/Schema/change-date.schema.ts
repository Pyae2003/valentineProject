import { z } from "zod";

export const ourDateSchema = z
  .object({
    days: z
      .number()
      .int("Day must be a whole number")
      .min(1, "Day must be between 1 and 31")
      .max(31, "Day must be between 1 and 31"),

    months: z
      .number()
      .int("Month must be a whole number")
      .min(1, "Month must be between 1 and 12")
      .max(12, "Month must be between 1 and 12"),

    year: z
      .number()
      .int("Year must be a whole number")
      .min(1900, "Year is too small"),
  })
  .superRefine((data, ctx) => {
    const { days, months, year } = data;

    const inputDate = new Date(year, months - 1, days);
    const today = new Date();

    // invalid date စစ်
    const isValidDate =
      inputDate.getFullYear() === year &&
      inputDate.getMonth() === months - 1 &&
      inputDate.getDate() === days;

    if (!isValidDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid date",
        path: ["days"],
      });
      return;
    }

    // today ကို time မပါအောင်
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate > today) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Future date is not allowed",
        path: ["year"],
      });
    }
  });

  

  export type FormValues = z.input<typeof ourDateSchema>;