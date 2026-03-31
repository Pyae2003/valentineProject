"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { LoaderCircle, Heart } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { ourDateSchema, FormValues } from "../Schema/change-date.schema";
import { OurDate } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { dashboard } from "@/constants/routes";
import Link from "next/link";
import { changeTime } from "../actions/changeTime";

const ChangeDateForm = ({ days, months, year }: OurDate) => {
  const { execute, isPending, hasErrored, hasSucceeded } = useAction(changeTime);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(ourDateSchema),
    defaultValues: {
      days: Number(days),
      months: Number(months),
      year: Number(year),
    },
  });

  async function onSubmit(data: z.infer<typeof ourDateSchema>) {
    execute(data);
  }

  useEffect(() => {
    if (hasErrored) {
      toast.error("Anni Date Changing failed 💔", {
        position: "top-center",
      });
    }
    if (hasSucceeded) {
      form.reset();
      toast.success("Anni Date Changing successfully 💕", {
        position: "top-center",
      });

      router.push(dashboard);
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <div className=" flex items-center justify-center px-4 py-10 ">
      <Card className="w-full max-w-sm sm:max-w-md rounded-3xl shadow-2xl bg-white text-pink-600">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-200">
            <Heart className="text-pink-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            For change Our Photo
          </CardTitle>
          <CardDescription className="text-gray-500">
            When I miss you…
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form id="AddMusicForm" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-5">
              {/* Name */}
              <Controller
                name="days"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Your Our Anni Day : </FieldLabel>
                    <Input
                      type="number"
                      value={field.value as number ?? 0}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-11 rounded-xl"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="months"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Your Our Anni months : </FieldLabel>
                    <Input
                      type="number"
                      value={field.value as number ?? 0}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-11 rounded-xl"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="year"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Enter Our Anni Year : </FieldLabel>
                    <Input
                      type="number"
                      value={field.value as number ?? 0}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-11 rounded-xl"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl"
            disabled={isPending}
          >
            <Link href={dashboard}>Back</Link>
          </Button>

          <Button
            type="submit"
            form="AddMusicForm"
            className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Update Anni Date
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChangeDateForm;
