import React, { useState } from "react";
import { Compass } from "lucide-react";
import { cn } from "../lib/utils";

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className,
  aspectClassName,
  fallbackTitle,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex flex-col items-center justify-center rounded-[4px] border border-[#D0CDD3] bg-gradient-to-br from-[#DEEFE4] via-[#FAFBF7] to-[#FEF8DF] p-6 text-center",
          aspectClassName,
          className
        )}
      >
        <Compass className="mb-2 h-7 w-7 text-[#135126]/70" />
        <p className="font-display text-sm font-medium text-[#15293A]">
          {fallbackTitle || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={cn("rounded-[4px] object-cover", aspectClassName, className)}
    />
  );
};
