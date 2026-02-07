"use client"
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
import { ourPhotosPath } from "@/constants/routes";
import { addOurSoloImageSchema, imageFileSchema } from "../schemas";
import { imageUploadUrl } from "../actions/imageUploadUrl";
import { addPhotos } from "../actions/add-photo";
import { useRouter } from "next/navigation";

const AddImage = () => {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(addPhotos);

    const router = useRouter();

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

    const validatateFile = await imageFileSchema.safeParse(image);

    console.log(validatateFile);

    if (!validatateFile.success) {
      toast.error("Invalid File?", { position: "top-center" });
      return;
    }

    const { signedUrl, path } = await imageUploadUrl(validatateFile.data);

    execute({
      name,
      title,
      description,
      imagePath: path,
    });

    console.log(signedUrl, path);

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
      toast.error("Image Creation Fail!", { position: "top-center" });
      return;
    } else {
      if (hasSucceeded) {
        router.push(ourPhotosPath)
        form.reset();
        toast.success("Image Saving Success", { position: "top-center" });
      }
    }
  }, [hasErrored, hasSucceeded]);

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
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Song Title</FieldLabel>
                  <Input
                    {...field}
                    autoComplete="false"
                    placeholder="Enter Your Name..."
                  />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Song Title</FieldLabel>
                  <Input {...field} placeholder="Enter title..." />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Song Title</FieldLabel>
                  <Input {...field} placeholder="Enter  Resons ..." />
                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Choose Audio : </FieldLabel>
                  <Input
                    type="file"
                    accept="image/*"
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
          Add Photo
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddImage;
