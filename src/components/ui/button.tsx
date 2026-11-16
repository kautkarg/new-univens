import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-[4px] text-sm font-medium transition-all duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFBF7] disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#135126] text-white hover:bg-[#0e3f1d] active:scale-[0.99]",
        dark:
          "bg-[#15293A] text-white hover:bg-[#1e384e] active:scale-[0.99]",
        accent:
          "bg-[#FFBB40] text-[#15293A] font-semibold hover:bg-[#f2ae30] active:scale-[0.99]",
        outline:
          "border border-[#D0CDD3] bg-white/80 text-[#15293A] hover:border-[#135126] hover:bg-[#DEEFE4]/40",
        glass:
          "bg-white/75 backdrop-blur-md border border-white/60 text-[#15293A] hover:bg-white/95 shadow-sm",
        ghost:
          "text-[#15293A] hover:bg-[#DEEFE4]/50 hover:text-[#135126]",
        link:
          "text-[#135126] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-7 py-3 text-base",
        icon: "h-10 w-10",
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
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
