"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import path from "path";
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
import { profileServerSetupSchema, profileSetupSchema } from "../schema";
import { createProfileImageUploadUrls } from "../actions/profileImageUploadUrl";
import { Profile } from "@/generated/prisma/client";
import { updateProfileImage } from "../actions/update-profileImage";
import { profileUpdateServerSetupSchema, profileUpdateSetupSchema } from "../schema/updateprofile-schema";

const UpdatedProfilePage = ({ boyName, girlName }: Profile) => {
  const { execute, isPending, hasErrored, hasSucceeded } =
    useAction(updateProfileImage);

  const form = useForm<z.infer<typeof profileUpdateSetupSchema>>({
    resolver: zodResolver(profileUpdateSetupSchema),
    defaultValues: {
      boyName: boyName,
      boyImage: undefined,
      girlName: girlName,
      girlImage: undefined,
    },
  });

  async function onSubmit({
    boyName,
    boyImage,
    girlName,
    girlImage,
  }: z.infer<typeof profileUpdateSetupSchema>) {

    if(!boyName || !girlName){
      return;
    }
    
    if (!boyImage || !girlImage) {
      execute({
        boyName,
        girlName,
      });
      return;
    }

    const ex1 = path.extname(boyImage.name);

    const ex2 = path.extname(girlImage.name);

    const { boy, girl } = await createProfileImageUploadUrls(ex1, ex2);

    console.log(girl, boy);

    const boyUpload = await fetch(boy.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": boyImage.type,
      },
      body: boyImage,
    });

    if (!boyUpload.ok) {
      toast.error("Upload failed");
      return;
    }

    const girlUpload = await fetch(girl.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": girlImage.type,
      },
      body: girlImage,
    });

    if (!girlUpload.ok) {
      toast.error("Upload failed");
      return;
    }

    execute({
      boyName,
      boyImage: boy.path,
      girlName,
      girlImage: girl.path,
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
      toast.success("Profile Image  success 💕", {
        position: "top-center",
      });
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
            Update Our Profile Photo
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
                name="boyName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Your Boy Name : </FieldLabel>
                    <Input
                      {...field}
                      placeholder="Enter Boy Name…"
                      className="h-11 rounded-xl"
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="boyImage"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Choose Boy Image : </FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
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
              <Controller
                name="girlName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Enter Girl Name : </FieldLabel>
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

              <Controller
                name="girlImage"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Choose Girl Image : </FieldLabel>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
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
            {isPending && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Update Profile Photo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UpdatedProfilePage;
