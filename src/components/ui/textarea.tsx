import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[104px] w-full rounded-[4px] border border-[#D0CDD3] bg-white px-3.5 py-2.5 text-sm text-[#15293A] placeholder:text-[#555555]/65 transition-colors focus-visible:outline-none focus-visible:border-[#135126] focus-visible:ring-2 focus-visible:ring-[#135126]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
