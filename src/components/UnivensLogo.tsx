import React from "react";
import { cn } from "../lib/utils";

interface UnivensLogoProps {
  variant?: "topbar" | "horizontal" | "mark";
  surface?: "light" | "dark";
  className?: string;
}

/**
 * Renders the official Univens geometric logomark without altering proportions,
 * strictly following the Univens Brand Guidelines (Pages 24–28).
 */
export const UnivensMark: React.FC<{
  surface?: "light" | "dark";
  fillColor?: string;
  className?: string;
}> = ({ surface = "light", fillColor, className }) => {
  const fill = fillColor ?? (surface === "dark" ? "#FFFFFF" : "#15293A");
  return (
    <svg
      viewBox="0 0 56 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path
        d="M22.7214 12.7649C23.2453 13.2888 22.983 14.1848 22.2593 14.3433L18.9988 15.0573C18.2751 15.2158 18.0127 16.1117 18.5366 16.6356L33.7912 31.8902C34.2753 32.3743 35.0982 32.1929 35.3339 31.5501L36.4848 28.4109C36.7205 27.7682 37.5434 27.5867 38.0275 28.0708L42.3127 32.3561C42.5709 32.6142 42.6556 32.9987 42.53 33.3414L39.7643 40.8848L38.2831 44.9251C38.0475 45.5679 37.2245 45.7493 36.7404 45.2652L7.3454 15.8702L3.78996 12.3155C3.26597 11.7916 3.52841 10.8955 4.25223 10.7371L9.16376 9.66218L17.2403 7.89478C17.5522 7.82651 17.8775 7.92178 18.1033 8.14757L22.7214 12.7649ZM52.572 5.96394L49.7683 13.6055L48.2592 17.815C48.026 18.4653 47.1934 18.6485 46.7089 18.1561L34.3701 5.61647C33.8528 5.09074 34.1174 4.20114 34.8379 4.04353L48.3229 1.09382L53.2161 0.0225465C53.9387 -0.135643 54.5512 0.566293 54.2965 1.26075L52.572 5.96394Z"
        fill={fill}
      />
    </svg>
  );
};

export const UnivensLogo: React.FC<UnivensLogoProps> = ({
  variant = "topbar",
  surface = "light",
  className,
}) => {
  if (variant === "mark") {
    return <UnivensMark surface={surface} className={cn("h-8 w-8", className)} />;
  }

  if (variant === "topbar") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2.5 whitespace-nowrap shrink-0",
          className
        )}
      >
        <UnivensMark surface={surface} className="h-6 w-7" />
        <span
          className={cn(
            "font-display text-xl font-bold tracking-tight",
            surface === "dark" ? "text-white" : "text-[#15293A]"
          )}
        >
          Univens
        </span>
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3.5 shrink-0", className)}>
      <UnivensMark surface={surface} className="h-9 w-10" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-2xl font-bold tracking-tight",
            surface === "dark" ? "text-white" : "text-[#15293A]"
          )}
        >
          Univens
        </span>
        <span
          className={cn(
            "mt-1 text-xs font-normal tracking-normal",
            surface === "dark" ? "text-[#D0CDD3]" : "text-[#555555]"
          )}
        >
          Executions First Growth Agency
        </span>
      </span>
    </span>
  );
};

/**
 * Brand PDF geometric L-corner framing accent using Warm Yellow (#FFBB40).
 */
export const GeometricFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}> = ({ children, className, accentColor = "#FFBB40" }) => {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l-2 border-t-2"
        style={{ borderColor: accentColor }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-2.5 w-2.5 border-r-2 border-t-2"
        style={{ borderColor: accentColor }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-2.5 w-2.5 border-b-2 border-l-2"
        style={{ borderColor: accentColor }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b-2 border-r-2"
        style={{ borderColor: accentColor }}
      />
      {children}
    </div>
  );
};
