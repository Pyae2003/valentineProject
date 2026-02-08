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
import { blindbox, dashboard } from "@/constants/routes";
import { login } from "../actions";

export function Login() {
  const { execute, isPending, hasSucceeded, result, hasErrored } =
    useAction(login);

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
      toast.success(result.data?.message, { position: "top-center" });
      router.push(localStorage.getItem("IsLog-in") ? dashboard : blindbox);
      localStorage.setItem("IsLog-in", "true");
    }

    if (hasErrored) {
      toast.error("Login Fail!", { position: "top-center" });
    }
  }, [hasSucceeded, hasErrored]);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await execute(values);
  }

  return (
    <Card className="w-full sm:max-w-md shadow-2xl text-pink-600">
      <CardHeader>
        <CardTitle>🌸 Enter My Love Space</CardTitle>
        <CardDescription>🐳 My special moments are waiting.</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Enter Username :</FieldLabel>
                  <Input
                    {...field}
                    id="username"
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
                  <FieldLabel htmlFor="password">Enter Password :</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="••••••"
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
          <Button variant="outline" asChild disabled={isPending}>
            <Link href="/">Back</Link>
          </Button>

          <Button
            className="bg-pink-500"
            type="submit"
            form="login-form"
            disabled={isPending}
          >
            {isPending && (
              <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
            )}
            Login
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
