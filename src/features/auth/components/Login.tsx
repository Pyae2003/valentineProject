"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { loginSchema } from "@/validator";
import { useAction } from "next-safe-action/hooks";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { blindbox, dashboard, loginPath } from "@/constants/routes";
import { login } from "../actions";


export function Login() {
  const { execute, isPending, hasSucceeded, result, hasErrored } = useAction(login);

  const router = useRouter();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });


  React.useEffect(() => {
    if (hasSucceeded) {
      form.reset();
      localStorage.setItem("IsLog-in", "One Time Login!");
      toast.success(result.data?.message, { position: "top-center" });
      router.push(localStorage.getItem("Islog-in") ? dashboard : blindbox)
    } else if (hasErrored) {
      toast.error("Login Fail!", { position: "top-center" });
      router.push(loginPath)
    }
  }, [hasErrored, hasSucceeded])

  async function onSubmit({ username, password }: z.infer<typeof loginSchema>) {
    await execute({ username, password });
  };



  return (
    <Card className="w-full shadow-2xl text-pink-600 sm:max-w-md ">
      <CardHeader>
        <CardTitle>🌸 Enter My Love Space</CardTitle>
        <CardDescription>🐳 My special moments are waiting. </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Enter Username :
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    type="text"
                    placeholder="Username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Enter Password :
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="xxx"
                    type="password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" disabled={isPending}>
            <Link href={"/"}>
              Back
            </Link>
          </Button>
          <Button className="bg-pink-500 " type="submit" form="form-rhf-demo" disabled={isPending}>
            {isPending ? <LoaderCircle className="animate-spin h-4 - w4" /> : ""} Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
