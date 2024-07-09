import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { Icons } from "../icons";
import { Icon } from "lucide-react";

const buttonVariants = cva(
  "border inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost:
          "border-0 hover:bg-accent hover:text-accent-foreground  focus-visible:ring-0",
        none: "",
      },
      size: {
        default: "h-10 py-1 px-4",
        lg: "h-18 py-3 px-8",
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
  text?: string;
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
      disabled,
      ...props
    },
    ref
  ) => (
    <button
      className={cn(
        buttonVariants({ variant, size, className }),
        "items-center gap-2",
        disabled ? "opacity-50 cursor-not-allowed " : ""
      )}
      ref={ref}
      {...props}
    >
      {props?.children
        ? props?.children
        : loading &&
          !iconLeft &&
          !iconRight && <Icons.spinner className="h-4 w-4 animate-spin" />}
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
