import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { Icons } from "../icons";
import { Icon } from "lucide-react";

const buttonVariants = cva(
  "border inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 py-2 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      text,
      iconLeft,
      loading = false,
      iconRight,
      ...props
    },
    ref
  ) => (
    <button
      className={cn(
        buttonVariants({ variant, size, className }),
        "items-center gap-2"
      )}
      ref={ref}
      {...props}
    >
      {loading && !iconLeft && !iconRight && (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      )}
      {iconLeft && loading ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        iconLeft
      )}
      {text}
      {iconRight && loading ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        iconRight
      )}
    </button>
  )
);

Button.displayName = "Button";

export { Button, buttonVariants };
