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
import { addOurSoloImageSchema, imageFileSchema } from "../schemas";
import { imageUploadUrl } from "../actions/imageUploadUrl";
import { addPhotos } from "../actions/add-photo";

const AddImage = () => {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(addPhotos);

  const form = useForm<z.infer<typeof addOurSoloImageSchema>>({
    resolver: zodResolver(addOurSoloImageSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
      image: undefined,
    },
  });

  async function onSubmit({
    title,
    name,
    description,
    image,
  }: z.infer<typeof addOurSoloImageSchema>) {
    if (!image) {
      toast.warning("Please select an image 📸", {
        position: "top-center",
      });
      return;
    }

    const validateFile = await imageFileSchema.safeParse(image);

    if (!validateFile.success) {
      toast.error("Invalid image file 😢", {
        position: "top-center",
      });
      return;
    }

    const { signedUrl, path } = await imageUploadUrl(validateFile.data);

    execute({
      name,
      title,
      description,
      imagePath: path,
    });

    await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": image.type,
      },
      body: image,
    });
  }

  useEffect(() => {
    if (hasErrored) {
      toast.error("Image creation failed 💔", {
        position: "top-center",
      });
    }

    if (hasSucceeded) {
      form.reset();
      toast.success("Image saved successfully 💕", {
        position: "top-center",
      });
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <div className=" flex items-center justify-center px-4 py-10 ">
      <Card className="w-full max-w-sm sm:max-w-md rounded-3xl shadow-2xl bg-white text-pink-600">
        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-200">
            <Heart className="text-pink-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            My Heart
          </CardTitle>
          <CardDescription className="text-gray-500">
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
              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Your Name</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter your name…"
                      className="h-11 rounded-xl"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Title */}
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Photo Title</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter photo title…"
                      className="h-11 rounded-xl"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Description */}
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Description</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Why this photo matters…"
                      className="h-11 rounded-xl"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Image Upload */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Choose Image</FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        field.onChange(e.target.files?.[0])
                      }
                      className="
                        h-11 rounded-xl
                        file:mr-3 file:rounded-lg
                        file:border-0 file:bg-pink-100
                        file:px-4 file:py-2
                        file:text-pink-600
                        hover:file:bg-pink-200
                      "
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
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="AddMusicForm"
            className="w-full rounded-xl bg-pink-500 hover:bg-pink-600 flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isPending && (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            )}
            Add Photo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddImage;
