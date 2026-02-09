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

import { toast } from "sonner";
import { addOurSoloImageSchema, imageFileSchema } from "../../schemas";
import { coupleImageUploadUrl } from "../actions/coupleImageUploadUrl";
import { addCouplePhotos } from "../actions/add-couple";

const AddCoupleImage = () => {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(addCouplePhotos);

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
      toast.warning("Please select an image!!", { position: "top-center" });
      return;
    }

    const validateFile = await imageFileSchema.safeParse(image);

    if (!validateFile.success) {
      toast.error("Invalid File?", { position: "top-center" });
      return;
    }

    const { signedUrl, path } = await coupleImageUploadUrl(validateFile.data);

    execute({
      name,
      title,
      description,
      imagePath: path,
    });

    await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": image!.type,
      },
      body: image,
    });
  }

  useEffect(() => {
    if (hasErrored) {
      toast.error("Image Creation Failed!", { position: "top-center" });
      return;
    }
    if (hasSucceeded) {
      form.reset();
      toast.success("Our Couple Image Saved Successfully", {
        position: "top-center",
      });
    }
  }, [hasErrored, hasSucceeded]);

  return (
    <div className="px-4 sm:px-6 md:px-8 mt-6">
      <Card className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto text-pink-500 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-xl sm:text-2xl">💑 Save Our Couple Image</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Not just images, but feelings we chose to keep. Our memories, our world. ❤️
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="coupleImageAddingForm"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup className="space-y-4">
              {/* Name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Name:</FieldLabel>
                    <Input
                      {...field}
                      autoComplete="off"
                      placeholder="Enter Your Name..."
                      className="text-sm sm:text-base"
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
                    <FieldLabel>Title:</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter title..."
                      className="text-sm sm:text-base"
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
                    <FieldLabel>Description:</FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter reasons..."
                      className="text-sm sm:text-base"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Image */}
              <Controller
                name="image"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Choose Couple Image:</FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        field.onChange(file);
                      }}
                      className="text-sm sm:text-base"
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

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            className="w-full sm:w-auto"
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button
            type="submit"
            form="coupleImageAddingForm"
            className="w-full sm:w-auto bg-pink-500 flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isPending && (
              <LoaderCircle className="h-4 w-4 animate-spin text-white" />
            )}
            Add Our Photo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCoupleImage;
