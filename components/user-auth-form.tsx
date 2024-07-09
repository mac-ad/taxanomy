"use client";

import { userAuthSchema } from "@/lib/validations/userAuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormData = z.infer<typeof userAuthSchema>;

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();

  console.log(searchParams?.get("from") || "/dashboard");

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    console.log("data =", data);
    setIsLoading(true);

    const signInResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/dashboard",
    });

    console.log("result =", signInResult);

    // if (!signInResult?.ok) {
    //   return toast({
    //     title: "Somethign went wrong",
    //     description: "Your sign in request failed. Please try again",
    //     variant: "destructive",
    //   });
    // }

    if (!signInResult?.ok) {
      return toast.error("Something went wrong");
    }

    setIsLoading(false);
    router.push("/check-mail");
    return toast.success("Check your email for login link");
  };

  return (
    <div className="grid gap-6 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <div className="grid gap-2">
              <Input
                type="text"
                id="email"
                placeholder="name@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading || isGithubLoading}
                {...register("email")}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors?.email?.message}
                </p>
              )}
            </div>
          </div>
          <Button
            text="Sign In With Email"
            disabled={isGithubLoading || isLoading}
            loading={isLoading}
          />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <Button
          onClick={() => {
            setIsGithubLoading(true);
            signIn("github");
          }}
          disabled={isGithubLoading || isLoading}
          text="Github"
          iconLeft={<Icons.github className="h-4 w-4" />}
          variant="outline"
          loading={isGithubLoading}
        />
        <Button
          onClick={() => {
            // disabled
            if (true) return;

            setIsGithubLoading(true);
            signIn("github");
          }}
          disabled={isGithubLoading || isLoading || true}
          text="Google"
          iconLeft={<Icons.google className="h-4 w-4" />}
          variant="outline"
          loading={false}
        />
      </div>
    </div>
  );
};

export default UserAuthForm;
