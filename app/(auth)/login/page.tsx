import { Icons } from "@/components/icons";
import UserAuthForm from "@/components/user-auth-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <div className="container h-screen w-screen flex items-center justify-center">
      <Link
        href="/"
        className="flex items-center absolute left-4 top-4 md:left-8 md:top-8 gap-2"
      >
        <Icons.chevronLeft className="h-4 w-4" />
        Back
      </Link>
      <div className="mx-auto flex flex-col items-center space-y-6 justify-center w-full sm:max-w-[400px]">
        <div className="flex flex-col space-y-2 items-center text-center w-full">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="  text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        {/* auth form */}
        <UserAuthForm />
        <p className="text-sm text-muted-foreground text-center">
          <Link href="/register" className="underline underline-offset-4">
            Don&apos;t have an account? Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
