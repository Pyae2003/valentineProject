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
import {
  audioFileSchema,
  audioTitleSchema,
} from "@/validator/addMusic-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { dashboard } from "@/constants/routes";
import { createAudio, createUploadUrl } from "../actions";

const AddAudioForm = () => {
  const router = useRouter();
  const { execute, isPending, result, hasErrored, hasSucceeded } =
    useAction(createAudio);

  const form = useForm<z.infer<typeof audioTitleSchema>>({
    resolver: zodResolver(audioTitleSchema),
    defaultValues: {
      title: "",
      audio: undefined,
    },
  });

  async function onSubmit({
    title,
    audio,
  }: z.infer<typeof audioTitleSchema>) {
    if (!audio) {
      toast.warning("Please select an audio file 💿", {
        position: "top-center",
      });
      return;
    }

    const validateFile = await audioFileSchema.safeParse(audio);

    if (!validateFile.success) {
      toast.error("Invalid audio file 😢", {
        position: "top-center",
      });
      return;
    }

    const { signedUrl, path } = await createUploadUrl();

    execute({ title, filePath: path });

    await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": audio.type },
      body: audio,
    });
  }

  useEffect(() => {
    if (hasErrored) {
      toast.error("Audio creation failed 💔", {
        position: "top-center",
      });
      return;
    }

    if (hasSucceeded) {
      form.reset();
      router.push(dashboard);
      toast.success(result.data?.message ?? "Uploaded 💕", {
        position: "top-center",
      });
    }
  }, [hasErrored, hasSucceeded, result]);

  return (
    <div className="flex items-center justify-center px-4 py-10">
      <Card className="w-full  bg-white rounded-3xl shadow-2xl">
        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-pink-200">
            <Heart className="text-pink-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-pink-600">
            My Heart
          </CardTitle>
          <CardDescription className="text-sm text-gray-500">
            When I miss you…
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form
            id="AddMusicForm"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="space-y-5">
              {/* Song title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-pink-500">
                      Song Title
                    </FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter song title…"
                      className="h-11 rounded-xl"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Audio file */}
              <Controller
                name="audio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="text-pink-500">
                      Choose Audio
                    </FieldLabel>

                    <Input
                      type="file"
                      accept="audio/*"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0])
                      }
                      className="h-11 rounded-xl file:mr-3 file:rounded-lg file:border-0 file:bg-pink-100 file:px-4 file:py-2 file:text-pink-600 hover:file:bg-pink-200"
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
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="AddMusicForm"
            className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 flex items-center justify-center gap-2"
          >
            {isPending && (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddAudioForm;
