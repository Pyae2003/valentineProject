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
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { createAudio } from "../actions/audios/create-autio";
import {
  audioFileSchema,
  audioTitleSchema,
} from "@/validator/addMusice-schema";
import { createUploadUrl } from "../actions/audios/createUploadUrl";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { dashboard } from "@/constants/routes";

const AddAudioForm = () => {
  const Router = useRouter();
  const { execute, isPending, result, hasErrored, hasSucceeded } =
    useAction(createAudio);

  const form = useForm<z.infer<typeof audioTitleSchema>>({
    resolver: zodResolver(audioTitleSchema),
    defaultValues: {
      title: "",
      audio: undefined,
    },
  });

  async function onSubmit({ title, audio }: z.infer<typeof audioTitleSchema>) {

    if (!audio) {
      toast.warning("Please select an audio file", { position: "top-center" });
      return;
    }

    const validatateFile = await audioFileSchema.safeParse(audio);

    console.log(validatateFile);

    if (!validatateFile.success) {
      toast.error("Invalid File?", { position: "top-center" });
      return;
    };

    const { signedUrl, path } = await createUploadUrl();

    execute({
      title,
      filePath: path,
    });

    console.log(signedUrl,path);

    await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": audio!.type,
      },
      body: audio,
    });
  
  };

  useEffect(() => {
    if (hasErrored) {
      toast.error("Audio Creation Fail!", { position: "top-center" });
      return;
    } else {
      if (hasSucceeded) {
        Router.push(dashboard);
        form.reset();
        toast.success(result.data?.message, { position: "top-center" });
      }
    }
  }, [hasErrored, hasSucceeded, result]);

  return (
    <Card className="w-full max-w-md text-pink-500">
      <CardHeader>
        <CardTitle>My Heart</CardTitle>
        <CardDescription>When I miss you…</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="AddMusicForm" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Song Title</FieldLabel>
                  <Input {...field} placeholder="Enter song title..." />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="audio"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Choose Audio : </FieldLabel>
                  <Input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file);
                    }}
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
      <CardFooter className="flex gap-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            form.reset();
          }}
        >
          Reset
        </Button>

        <Button type="submit" form="AddMusicForm" className="bg-pink-500">
          {isPending && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
          submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddAudioForm;
