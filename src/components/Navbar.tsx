import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Clock,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  CORE_STRENGTHS,
  POSSIBILITIES_BLUEPRINTS,
  PageRoute,
} from "../data/univensData";
import { cn } from "../lib/utils";
import { UnivensLogo, UnivensMark } from "./UnivensLogo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface NavbarProps {
  activePage: PageRoute;
  activeOfferingId?: string | null;
  onNavigate: (page: PageRoute, slug?: string) => void;
  onOpenBrief: (
    defaultMode?: "brief" | "opportunities",
    strength?: string
  ) => void;
}

const NAV_LINKS: { label: string; route: PageRoute }[] = [
  { label: "Home", route: "home" },
  { label: "About Us", route: "about" },
  { label: "Offerings", route: "offerings" },
  { label: "Possibilities", route: "possibilities" },
  { label: "Case Studies", route: "case-studies" },
];

const SPOTLIGHT_MAP: Record<string, { blueprintIndex: number }> = {
  presence: { blueprintIndex: 2 },
  acquisition: { blueprintIndex: 2 },
  systems: { blueprintIndex: 1 },
  products: { blueprintIndex: 0 },
  expansion: { blueprintIndex: 3 },
  direction: { blueprintIndex: 0 },
};

function formatIndiaTime(): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    const istDate = new Date(Date.now() + 330 * 60 * 1000);
    const hh = String(istDate.getUTCHours()).padStart(2, "0");
    const mm = String(istDate.getUTCMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }
}

interface AdaptiveNavSurface {
  isHero: boolean;
  isDark: boolean;
  tintRgba: string;
  isSkyTop: boolean;
}

const DEFAULT_LIGHT_SURFACE: AdaptiveNavSurface = {
  isHero: false,
  isDark: false,
  tintRgba: "#FAFBF7",
  isSkyTop: false,
};

const HERO_SURFACE: AdaptiveNavSurface = {
  isHero: true,
  isDark: true,
  tintRgba: "#F2F8FC",
  isSkyTop: false,
};

let colorParserCtx: CanvasRenderingContext2D | null = null;

function parseCssColorRgba(
  rawColor: string
): { r: number; g: number; b: number; a: number } | null {
  if (!rawColor || rawColor === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0 };
  }

  const rgbMatch = rawColor.match(
    /^rgba?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)(?:\s*,\s*([\d.]+))?\s*\)$/i
  );
  if (rgbMatch) {
    return {
      r: Math.round(Number(rgbMatch[1])),
      g: Math.round(Number(rgbMatch[2])),
      b: Math.round(Number(rgbMatch[3])),
      a: rgbMatch[4] !== undefined ? Number(rgbMatch[4]) : 1,
    };
  }

  if (typeof document === "undefined") return null;

  if (!colorParserCtx) {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    colorParserCtx = canvas.getContext("2d", { willReadFrequently: true });
  }

  if (!colorParserCtx) return null;

  colorParserCtx.clearRect(0, 0, 1, 1);
  colorParserCtx.fillStyle = "rgba(0,0,0,0)";
  colorParserCtx.fillStyle = rawColor;
  colorParserCtx.fillRect(0, 0, 1, 1);
  const pixel = colorParserCtx.getImageData(0, 0, 1, 1).data;
  return {
    r: pixel[0],
    g: pixel[1],
    b: pixel[2],
    a: pixel[3] / 255,
  };
}

function getRelativeLuminance(r: number, g: number, b: number): number {
  const toLinear = (c: number) => {
    const srgb = c / 255;
    return srgb <= 0.03928
      ? srgb / 12.92
      : Math.pow((srgb + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
  );
}

function resolveOpaqueElementRgb(
  el: HTMLElement
): { r: number; g: number; b: number } {
  const layers: { r: number; g: number; b: number; a: number }[] = [];
  let curr: HTMLElement | null = el;

  while (curr) {
    const bg = window.getComputedStyle(curr).backgroundColor;
    const parsed = parseCssColorRgba(bg);
    if (parsed && parsed.a > 0.01) {
      layers.push(parsed);
      if (parsed.a >= 0.99) break;
    }
    curr = curr.parentElement;
  }

  // Page base ground fallback (#FAFBF7)
  let outR = 250;
  let outG = 251;
  let outB = 247;

  for (let i = layers.length - 1; i >= 0; i--) {
    const layer = layers[i];
    const a = Math.min(1, Math.max(0, layer.a));
    outR = Math.round(layer.r * a + outR * (1 - a));
    outG = Math.round(layer.g * a + outG * (1 - a));
    outB = Math.round(layer.b * a + outB * (1 - a));
  }

  return { r: outR, g: outG, b: outB };
}

function resolveNavSurface(
  activePage: PageRoute,
  headerEl: HTMLElement | null
): AdaptiveNavSurface {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return activePage === "home" ? HERO_SURFACE : DEFAULT_LIGHT_SURFACE;
  }

  const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 72;
  const probeY = Math.max(20, Math.min(headerHeight * 0.5, 40));
  const candidates = document.querySelectorAll<HTMLElement>(
    "main section, footer"
  );

  let activeSection: HTMLElement | null = null;
  let closestSection: HTMLElement | null = null;
  let minDistance = Infinity;

  for (const el of candidates) {
    const rect = el.getBoundingClientRect();
    if (rect.height <= 0) continue;
    if (rect.top <= probeY && rect.bottom > probeY) {
      activeSection = el;
      break;
    }
    const distance =
      probeY < rect.top
        ? rect.top - probeY
        : probeY >= rect.bottom
          ? probeY - rect.bottom
          : 0;
    if (distance < minDistance) {
      minDistance = distance;
      closestSection = el;
    }
  }

  activeSection = activeSection ?? closestSection;

  if (!activeSection) {
    return activePage === "home" && window.scrollY < 40
      ? HERO_SURFACE
      : DEFAULT_LIGHT_SURFACE;
  }

  if (activeSection.hasAttribute("data-hero-section")) {
    return HERO_SURFACE;
  }

  if (activeSection.classList.contains("hero-sage-atmosphere")) {
    return {
      isHero: false,
      isDark: true,
      tintRgba: "#1B4D2B",
      isSkyTop: false,
    };
  }

  if (activeSection.classList.contains("horizon-gradient-surface")) {
    return {
      isHero: false,
      isDark: true,
      tintRgba: "#0D65BA",
      isSkyTop: false,
    };
  }

  if (activeSection.classList.contains("intro-cloud-surface")) {
    return {
      isHero: false,
      isDark: false,
      tintRgba: "#F2F8FC",
      isSkyTop: false,
    };
  }

  if (activeSection.classList.contains("sage-mist-band")) {
    return {
      isHero: false,
      isDark: false,
      tintRgba: "#E8F3FA",
      isSkyTop: false,
    };
  }

  const rgb = resolveOpaqueElementRgb(activeSection);
  const bgLuminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  const darkInkLuminance = 0.022; // #15293A
  const contrastWithWhite = (1.0 + 0.05) / (bgLuminance + 0.05);
  const contrastWithDark = (bgLuminance + 0.05) / (darkInkLuminance + 0.05);
  const isDark = contrastWithWhite > contrastWithDark;

  return {
    isHero: false,
    isDark,
    tintRgba: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    isSkyTop: !isDark && bgLuminance < 0.65,
  };
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  activeOfferingId,
  onNavigate,
  onOpenBrief,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navSurface, setNavSurface] = useState<AdaptiveNavSurface>(() =>
    activePage === "home" ? HERO_SURFACE : DEFAULT_LIGHT_SURFACE
  );
  const [megaOpen, setMegaOpen] = useState(false);
  const [localTime, setLocalTime] = useState<string>(formatIndiaTime);
  const [previewStrengthId, setPreviewStrengthId] = useState<string>(
    activeOfferingId || CORE_STRENGTHS[0].id
  );

  const headerRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (activeOfferingId) {
      setPreviewStrengthId(activeOfferingId);
    }
  }, [activeOfferingId]);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [activePage, activeOfferingId]);

  useEffect(() => {
    setLocalTime(formatIndiaTime());
    const interval = window.setInterval(() => {
      setLocalTime(formatIndiaTime());
    }, 5000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return;

    const updateNavbarHeight = () => {
      const nextHeight = Math.round(headerEl.getBoundingClientRect().height);
      if (nextHeight > 0) {
        document.documentElement.style.setProperty(
          "--navbar-height",
          `${nextHeight}px`
        );
      }
    };

    updateNavbarHeight();

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateNavbarHeight);
      resizeObserver.observe(headerEl);
    }

    window.addEventListener("resize", updateNavbarHeight, { passive: true });
    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateNavbarHeight);
    };
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const updateSurface = () => {
      const next = resolveNavSurface(activePage, headerRef.current);
      setNavSurface((prev) =>
        prev.isHero === next.isHero &&
        prev.isDark === next.isDark &&
        prev.tintRgba === next.tintRgba &&
        prev.isSkyTop === next.isSkyTop
          ? prev
          : next
      );
    };

    const scheduleUpdate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateSurface();
      });
    };

    updateSurface();
    const settleTimer = window.setTimeout(updateSurface, 120);

    let mutationObserver: MutationObserver | undefined;
    if (typeof MutationObserver !== "undefined") {
      mutationObserver = new MutationObserver(scheduleUpdate);
      const mainEl = document.querySelector("main");
      const footerEl = document.querySelector("footer");
      if (mainEl) {
        mutationObserver.observe(mainEl, {
          subtree: true,
          attributes: true,
          attributeFilter: ["class", "style"],
        });
      }
      if (footerEl) {
        mutationObserver.observe(footerEl, {
          attributes: true,
          attributeFilter: ["class", "style"],
        });
      }
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.clearTimeout(settleTimer);
      mutationObserver?.disconnect();
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [activePage, activeOfferingId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inHeader = headerRef.current?.contains(target);
      const inMega = megaMenuRef.current?.contains(target);
      if (!inHeader && !inMega) {
        setMegaOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const isImmersive = navSurface.isHero || navSurface.isDark;

  const openMegaMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setMegaOpen(true);
  };

  const scheduleCloseMegaMenu = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
    }, 180);
  };

  const handleLinkClick = (route: PageRoute, slug?: string) => {
    setMegaOpen(false);
    setMobileOpen(false);
    onNavigate(route, slug);
  };

  const handleOfferingSelect = (strengthId: string | null) => {
    setMegaOpen(false);
    setMobileOpen(false);
    onNavigate("offerings", strengthId ?? undefined);
  };

  const previewStrength =
    CORE_STRENGTHS.find((s) => s.id === previewStrengthId) ?? CORE_STRENGTHS[0];

  const spotlightConfig =
    SPOTLIGHT_MAP[previewStrength.id] ?? SPOTLIGHT_MAP.presence;
  const spotlightBlueprint =
    POSSIBILITIES_BLUEPRINTS[spotlightConfig.blueprintIndex] ??
    POSSIBILITIES_BLUEPRINTS[0];

  const renderOfferingsTrigger = (immersive: boolean) => {
    const isActive = activePage === "offerings";
    return (
      <div
        key="offerings"
        onMouseEnter={openMegaMenu}
        onMouseLeave={scheduleCloseMegaMenu}
        className="relative inline-flex h-14 md:h-[72px] items-center"
      >
        <a
          href="#offerings"
          aria-current={isActive ? "page" : undefined}
          aria-expanded={megaOpen}
          aria-haspopup="true"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              openMegaMenu();
            }
          }}
          onClick={(e) => {
            e.preventDefault();
            if (!megaOpen) {
              openMegaMenu();
            } else {
              handleLinkClick("offerings");
            }
          }}
          className={cn(
            "group relative inline-flex min-h-[40px] items-center gap-1 py-1.5 rounded-[4px] text-[13.5px] lg:text-[14px] tracking-[-0.01em] whitespace-nowrap shrink-0 transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)] focus-visible:outline-none focus-visible:ring-2",
            immersive
              ? cn(
                  "focus-visible:ring-white",
                  isActive || megaOpen
                    ? "text-white font-semibold"
                    : "font-medium text-white/85 hover:text-white"
                )
              : cn(
                  "focus-visible:ring-[#135126]",
                  isActive || megaOpen
                    ? "text-[#15293A] font-semibold"
                    : navSurface.isSkyTop
                      ? "font-medium text-[#15293A]/85 hover:text-[#15293A]"
                      : "font-medium text-[#475D6F] hover:text-[#15293A]"
                )
          )}
        >
          <span>Offerings</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 opacity-75 transition-transform duration-200",
              megaOpen && "rotate-180 opacity-100"
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-0 bottom-1 h-[1.5px] origin-left transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.45,0,0.25,1)]",
              immersive
                ? "bg-white"
                : navSurface.isSkyTop
                  ? "bg-[#15293A]"
                  : "bg-[#135126]",
              isActive || megaOpen
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            )}
          />
        </a>
      </div>
    );
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 w-full bg-transparent"
      >
        {/* Subtle readability scrim when positioned transparently over Hero photography */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B1712]/52 via-[#0B1712]/18 to-transparent transition-opacity duration-[650ms] ease-[cubic-bezier(0.45,0,0.25,1)]",
            navSurface.isHero && !megaOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Solid section-adaptive background after Hero: eases softly into each section's exact color with crisp structural edge */}
        <div
          aria-hidden="true"
          style={{
            backgroundColor: navSurface.tintRgba,
          }}
          className={cn(
            "pointer-events-none absolute inset-0 border-b transition-[background-color,border-color,opacity,box-shadow] duration-[650ms] ease-[cubic-bezier(0.45,0,0.25,1)]",
            isImmersive
              ? "border-white/[0.14]"
              : navSurface.isSkyTop
                ? "border-[#15293A]/[0.16] shadow-[0_1px_10px_-4px_rgba(21,41,58,0.10)]"
                : "border-[#15293A]/[0.10] shadow-[0_1px_10px_-4px_rgba(21,41,58,0.07)]",
            !navSurface.isHero && !megaOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Crisp solid bar strictly while desktop Offerings mega-menu is expanded */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 hidden md:block border-b transition-opacity duration-300 ease-[cubic-bezier(0.45,0,0.25,1)]",
            isImmersive
              ? "border-white/15 bg-[#0B1712]"
              : "border-[#D0CDD3]/80 bg-white",
            megaOpen ? "opacity-100" : "opacity-0"
          )}
        />

        <div className="relative z-10 mx-auto flex h-14 md:h-[72px] w-full max-w-[1920px] items-center justify-between gap-8 px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Left Zone: Clean wordmark + left-aligned editorial nav links */}
          <div className="flex items-center gap-10 lg:gap-16 xl:gap-20 min-w-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("home");
              }}
              className={cn(
                "inline-flex min-h-[40px] items-center rounded-[4px] py-1 whitespace-nowrap shrink-0 transition-opacity duration-200 hover:opacity-85 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2",
                isImmersive
                  ? "focus-visible:ring-white"
                  : "focus-visible:ring-[#135126]"
              )}
              aria-label="Univens Home"
            >
              <UnivensLogo
                variant="topbar"
                surface={isImmersive ? "dark" : "light"}
                hideMarkOnMobile
              />
            </a>

            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center gap-6 lg:gap-7"
            >
              {NAV_LINKS.map((item) => {
                if (item.route === "offerings") {
                  return renderOfferingsTrigger(isImmersive);
                }
                const isActive = activePage === item.route;
                return (
                  <a
                    key={item.route}
                    href={`#${item.route}`}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={scheduleCloseMegaMenu}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.route);
                    }}
                    className={cn(
                      "group relative inline-flex min-h-[40px] items-center py-1.5 rounded-[4px] text-[13.5px] lg:text-[14px] tracking-[-0.01em] whitespace-nowrap shrink-0 transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)] focus-visible:outline-none focus-visible:ring-2",
                      isImmersive
                        ? cn(
                            "focus-visible:ring-white",
                            isActive
                              ? "text-white font-semibold"
                              : "font-medium text-white/85 hover:text-white"
                          )
                        : cn(
                            "focus-visible:ring-[#135126]",
                            isActive
                              ? "text-[#15293A] font-semibold"
                              : navSurface.isSkyTop
                                ? "font-medium text-[#15293A]/85 hover:text-[#15293A]"
                                : "font-medium text-[#475D6F] hover:text-[#15293A]"
                          )
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-1 h-[1.5px] origin-left transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.45,0,0.25,1)]",
                        isImmersive
                          ? "bg-white"
                          : navSurface.isSkyTop
                            ? "bg-[#15293A]"
                            : "bg-[#135126]",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Right Zone: Quiet live India (IST) timestamp + crisp underlined action CTA + mobile drawer trigger */}
          <div className="flex items-center gap-6 lg:gap-10 xl:gap-14 shrink-0">
            <div
              title="Indian Standard Time (UTC+05:30)"
              aria-label={`India local time ${localTime} IST`}
              className={cn(
                "hidden lg:inline-flex items-center gap-1.5 text-[13px] font-medium tracking-[-0.005em] whitespace-nowrap select-none transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                isImmersive
                  ? "text-white/85"
                  : navSurface.isSkyTop
                    ? "text-[#15293A]/85"
                    : "text-[#475D6F]"
              )}
            >
              <Clock
                className="h-3.5 w-3.5 shrink-0 opacity-85"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span>India</span>
              <span className="tabular-nums">{localTime}</span>
              <span>IST</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setMegaOpen(false);
                onOpenBrief("brief");
              }}
              className={cn(
                "group hidden md:inline-flex min-h-[40px] items-center rounded-[4px] py-1.5 text-[13.5px] lg:text-[14px] font-semibold tracking-[-0.01em] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2",
                isImmersive
                  ? "text-white hover:text-[#FFF5D6] focus-visible:ring-white"
                  : navSurface.isSkyTop
                    ? "text-[#15293A] hover:text-[#15293A]/80 focus-visible:ring-[#15293A]"
                    : "text-[#15293A] hover:text-[#135126] focus-visible:ring-[#135126]"
              )}
            >
              <span
                className={cn(
                  "border-b-[1.5px] pb-[2px] transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                  isImmersive
                    ? "border-white/85 group-hover:border-[#FFBB40]"
                    : navSurface.isSkyTop
                      ? "border-[#15293A]/85 group-hover:border-[#15293A]"
                      : "border-[#15293A]/80 group-hover:border-[#135126]"
                )}
              >
                Explore Possibilities
              </span>
            </button>

            <div className="flex items-center gap-4 md:hidden">
              <button
                type="button"
                onClick={() => onOpenBrief("brief")}
                className={cn(
                  "inline-flex min-h-[40px] items-center rounded-[4px] py-1 text-[13px] font-semibold whitespace-nowrap cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2",
                  isImmersive
                    ? "text-white focus-visible:ring-white"
                    : "text-[#15293A] focus-visible:ring-[#135126]"
                )}
              >
                <span
                  className={cn(
                    "border-b-[1.5px] pb-[1px] transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                    isImmersive ? "border-white/85" : "border-[#15293A]/80"
                  )}
                >
                  Explore Possibilities
                </span>
              </button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open navigation menu"
                    className={cn(
                      "-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[4px] bg-transparent transition-[color,opacity,transform] duration-500 ease-[cubic-bezier(0.45,0,0.25,1)] hover:opacity-75 active:scale-[0.96] cursor-pointer focus-visible:outline-none focus-visible:ring-2",
                      isImmersive
                        ? "text-white focus-visible:ring-white"
                        : "text-[#15293A] focus-visible:ring-[#135126]"
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="h-5 w-5"
                    >
                      <path
                        d="M4 8.5H20M10 15.5H20"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  hideCloseButton
                  overlayClassName="bg-[#0B1712]/55"
                  style={{
                    backgroundColor: navSurface.isHero
                      ? "#0B1712"
                      : navSurface.tintRgba,
                  }}
                  className={cn(
                    "flex flex-col gap-5 overflow-y-auto p-5 md:hidden transition-[background-color,border-color,color] duration-[650ms] ease-[cubic-bezier(0.45,0,0.25,1)]",
                    isImmersive
                      ? "border-white/15 text-white"
                      : navSurface.isSkyTop
                        ? "border-[#15293A]/20 text-[#15293A]"
                        : "border-[#15293A]/12 text-[#15293A]"
                  )}
                >
                  <SheetTitle className="sr-only">
                    Univens Mobile Navigation
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Browse Univens offerings, company pages, and capability blueprints.
                  </SheetDescription>

                  {/* Top Row: Univens Logo + Live Location Clock */}
                  <div className="flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleLinkClick("home")}
                      aria-label="Univens Home"
                      className={cn(
                        "inline-flex items-center rounded-[4px] py-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2",
                        isImmersive
                          ? "focus-visible:ring-white"
                          : "focus-visible:ring-[#135126]"
                      )}
                    >
                      <UnivensLogo
                        variant="topbar"
                        surface={isImmersive ? "dark" : "light"}
                      />
                    </button>

                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs tabular-nums transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                        isImmersive
                          ? "text-white/80"
                          : navSurface.isSkyTop
                            ? "text-[#15293A]/85"
                            : "text-[#475D6F]"
                      )}
                    >
                      <Clock
                        className="h-3.5 w-3.5 opacity-80"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span>India {localTime} IST</span>
                    </div>
                  </div>

                  {/* Two-Column Directory Presentation */}
                  <nav
                    aria-label="Mobile Navigation"
                    className="grid grid-cols-2 gap-x-5 pt-1"
                  >
                    {/* Left Column: Offerings + Contact Button */}
                    <div
                      className={cn(
                        "flex flex-col justify-between border-r pr-4 transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                        isImmersive
                          ? "border-white/15"
                          : navSurface.isSkyTop
                            ? "border-[#15293A]/15"
                            : "border-[#15293A]/[0.08]"
                      )}
                    >
                      <div>
                        <p
                          className={cn(
                            "mb-3 text-[13px] font-semibold tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                            isImmersive ? "text-white" : "text-[#15293A]"
                          )}
                        >
                          Offerings
                        </p>
                        <ul className="space-y-2.5">
                          {CORE_STRENGTHS.map((pillar) => {
                            const isSelected =
                              activePage === "offerings" &&
                              activeOfferingId === pillar.id;
                            return (
                              <li key={pillar.id}>
                                <button
                                  type="button"
                                  onClick={() => handleOfferingSelect(pillar.id)}
                                  className={cn(
                                    "block w-full text-left text-[13.5px] transition-colors duration-300 cursor-pointer",
                                    isSelected
                                      ? isImmersive
                                        ? "font-semibold text-[#FFE27A]"
                                        : navSurface.isSkyTop
                                          ? "font-semibold text-[#0F2B1D]"
                                          : "font-semibold text-[#135126]"
                                      : isImmersive
                                        ? "font-normal text-white/75 hover:text-white"
                                        : navSurface.isSkyTop
                                          ? "font-normal text-[#15293A]/85 hover:text-[#15293A]"
                                          : "font-normal text-[#475D6F]/90 hover:text-[#135126]"
                                  )}
                                >
                                  {pillar.name}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLinkClick("contact")}
                        className={cn(
                          "mt-6 inline-flex w-fit items-center gap-1.5 rounded-[4px] px-3.5 py-2 text-xs font-medium transition-colors duration-300 cursor-pointer",
                          isImmersive
                            ? "bg-white text-[#15293A] hover:bg-[#FFF5D6]"
                            : "bg-[#15293A] text-white hover:bg-[#135126]"
                        )}
                      >
                        <span>Contact</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Right Column: Company, Insights, Engage */}
                    <div className="flex flex-col justify-between pl-1">
                      <div>
                        <p
                          className={cn(
                            "mb-2.5 text-[13px] font-semibold tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                            isImmersive ? "text-white" : "text-[#15293A]"
                          )}
                        >
                          Company
                        </p>
                        <ul className="space-y-2.5">
                          <li>
                            <button
                              type="button"
                              onClick={() => handleLinkClick("home")}
                              className={cn(
                                "block w-full text-left text-[13.5px] transition-colors duration-300 cursor-pointer",
                                activePage === "home"
                                  ? isImmersive
                                    ? "font-semibold text-[#FFE27A]"
                                    : navSurface.isSkyTop
                                      ? "font-semibold text-[#0F2B1D]"
                                      : "font-semibold text-[#135126]"
                                  : isImmersive
                                    ? "font-normal text-white/75 hover:text-white"
                                    : navSurface.isSkyTop
                                      ? "font-normal text-[#15293A]/85 hover:text-[#15293A]"
                                      : "font-normal text-[#475D6F]/90 hover:text-[#135126]"
                              )}
                            >
                              Home
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              onClick={() => handleLinkClick("about")}
                              className={cn(
                                "block w-full text-left text-[13.5px] transition-colors duration-300 cursor-pointer",
                                activePage === "about"
                                  ? isImmersive
                                    ? "font-semibold text-[#FFE27A]"
                                    : navSurface.isSkyTop
                                      ? "font-semibold text-[#0F2B1D]"
                                      : "font-semibold text-[#135126]"
                                  : isImmersive
                                    ? "font-normal text-white/75 hover:text-white"
                                    : navSurface.isSkyTop
                                      ? "font-normal text-[#15293A]/85 hover:text-[#15293A]"
                                      : "font-normal text-[#475D6F]/90 hover:text-[#135126]"
                              )}
                            >
                              About Us
                            </button>
                          </li>
                        </ul>

                        <p
                          className={cn(
                            "mt-5 mb-2.5 text-[13px] font-semibold tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                            isImmersive ? "text-white" : "text-[#15293A]"
                          )}
                        >
                          Insights
                        </p>
                        <ul className="space-y-2.5">
                          <li>
                            <button
                              type="button"
                              onClick={() => handleLinkClick("possibilities")}
                              className={cn(
                                "inline-flex w-full items-center gap-1.5 text-left text-[13.5px] transition-colors duration-300 cursor-pointer",
                                activePage === "possibilities"
                                  ? isImmersive
                                    ? "font-semibold text-[#FFE27A]"
                                    : navSurface.isSkyTop
                                      ? "font-semibold text-[#0F2B1D]"
                                      : "font-semibold text-[#135126]"
                                  : isImmersive
                                    ? "font-normal text-white/75 hover:text-white"
                                    : navSurface.isSkyTop
                                      ? "font-normal text-[#15293A]/85 hover:text-[#15293A]"
                                      : "font-normal text-[#475D6F]/90 hover:text-[#135126]"
                              )}
                            >
                              <span>Possibilities</span>
                              <span
                                className={cn(
                                  "text-[11px] font-medium transition-colors duration-300",
                                  isImmersive
                                    ? "text-[#FFE27A]"
                                    : navSurface.isSkyTop
                                      ? "text-[#0F2B1D]"
                                      : "text-[#135126]"
                                )}
                              >
                                New
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              onClick={() => handleLinkClick("case-studies")}
                              className={cn(
                                "block w-full text-left text-[13.5px] transition-colors duration-300 cursor-pointer",
                                activePage === "case-studies"
                                  ? isImmersive
                                    ? "font-semibold text-[#FFE27A]"
                                    : navSurface.isSkyTop
                                      ? "font-semibold text-[#0F2B1D]"
                                      : "font-semibold text-[#135126]"
                                  : isImmersive
                                    ? "font-normal text-white/75 hover:text-white"
                                    : navSurface.isSkyTop
                                      ? "font-normal text-[#15293A]/85 hover:text-[#15293A]"
                                      : "font-normal text-[#475D6F]/90 hover:text-[#135126]"
                              )}
                            >
                              Case Studies
                            </button>
                          </li>
                        </ul>

                        <p
                          className={cn(
                            "mt-5 mb-2.5 text-[13px] font-semibold tracking-tight transition-colors duration-500 ease-[cubic-bezier(0.45,0,0.25,1)]",
                            isImmersive ? "text-white" : "text-[#15293A]"
                          )}
                        >
                          Engage
                        </p>
                        <ul className="space-y-2.5">
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                setMobileOpen(false);
                                onOpenBrief("brief");
                              }}
                              className={cn(
                                "block w-full text-left text-[13.5px] font-normal transition-colors duration-300 cursor-pointer",
                                isImmersive
                                  ? "text-white/75 hover:text-white"
                                  : navSurface.isSkyTop
                                    ? "text-[#15293A]/85 hover:text-[#15293A]"
                                    : "text-[#475D6F]/90 hover:text-[#135126]"
                              )}
                            >
                              Share a Brief
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              onClick={() => handleOfferingSelect(null)}
                              className={cn(
                                "block w-full text-left text-[13.5px] transition-colors duration-300 cursor-pointer",
                                activePage === "offerings" && !activeOfferingId
                                  ? isImmersive
                                    ? "font-semibold text-[#FFE27A]"
                                    : navSurface.isSkyTop
                                      ? "font-semibold text-[#0F2B1D]"
                                      : "font-semibold text-[#135126]"
                                  : isImmersive
                                    ? "font-normal text-white/75 hover:text-white"
                                    : navSurface.isSkyTop
                                      ? "font-normal text-[#15293A]/85 hover:text-[#15293A]"
                                      : "font-normal text-[#475D6F]/90 hover:text-[#135126]"
                              )}
                            >
                              All Offerings
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </nav>

                  {/* Bottom Featured Card: Discover Possibilities */}
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenBrief("brief");
                    }}
                    className={cn(
                      "group relative flex min-h-[168px] w-full flex-col justify-between overflow-hidden rounded-[6px] p-4 text-left cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2",
                      isImmersive
                        ? "border border-white/20 bg-[#0B1712]/40 hover:bg-[#0B1712]/55 focus-visible:ring-white"
                        : "bg-gradient-to-br from-[#135126] via-[#0F2B1D] to-[#15293A] focus-visible:ring-[#135126]"
                    )}
                  >
                    <UnivensMark
                      surface="dark"
                      className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 opacity-[0.08] transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="relative z-10">
                      <p className="text-[11px] font-medium text-[#FFE27A]">
                        Discover
                      </p>
                      <h4 className="mt-1 font-display text-lg font-semibold leading-tight text-white">
                        Global ambition,
                        <br />
                        Indian capabilities
                      </h4>
                    </div>

                    <p className="relative z-10 max-w-[92%] text-xs leading-relaxed text-white/80">
                      Explore dedicated execution blueprints designed around your business priorities.
                    </p>
                  </button>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Offerings Desktop Mega Menu — Full-Width 4-Column Editorial Drawer */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            ref={megaMenuRef}
            key="offerings-mega-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={openMegaMenu}
            onMouseLeave={scheduleCloseMegaMenu}
            style={
              isImmersive
                ? {
                    backgroundColor: navSurface.isHero
                      ? "#0B1712"
                      : navSurface.tintRgba,
                  }
                : undefined
            }
            className={cn(
              "fixed left-0 right-0 top-[var(--navbar-height,72px)] z-40 hidden md:block border-b transition-colors duration-200",
              isImmersive
                ? "border-white/15 bg-[#0B1712] text-white shadow-[0_28px_60px_-15px_rgba(0,0,0,0.6)]"
                : "border-[#D0CDD3]/80 bg-white text-[#15293A] shadow-[0_24px_48px_-12px_rgba(21,41,58,0.14)]"
            )}
          >
            <div className="mx-auto w-full max-w-[1920px] px-4 py-8 md:px-8 lg:px-10 lg:py-10">
              <div className="grid grid-cols-12 gap-8 lg:gap-10">
                {/* Column 1: Core Offering Pillars */}
                <div className="col-span-3 flex flex-col justify-between">
                  <div>
                    <p
                      className={cn(
                        "mb-4 text-[11px] font-medium uppercase tracking-[0.12em]",
                        isImmersive ? "text-white/80" : "text-[#334A5C]"
                      )}
                    >
                      Capabilities
                    </p>
                    <ul className="space-y-1.5">
                      {CORE_STRENGTHS.map((pillar) => {
                        const isHovered = previewStrength.id === pillar.id;
                        const isSelectedRoute = activeOfferingId === pillar.id;
                        return (
                          <li key={pillar.id}>
                            <button
                              type="button"
                              onMouseEnter={() =>
                                setPreviewStrengthId(pillar.id)
                              }
                              onFocus={() => setPreviewStrengthId(pillar.id)}
                              onClick={() => handleOfferingSelect(pillar.id)}
                              className={cn(
                                "group flex w-full items-center justify-between py-1 text-left font-display text-[17px] transition-colors duration-150 cursor-pointer focus-visible:outline-none",
                                isImmersive
                                  ? isHovered || isSelectedRoute
                                    ? "font-semibold text-white"
                                    : "font-normal text-white/80 hover:text-white"
                                  : isHovered || isSelectedRoute
                                    ? "font-semibold text-[#135126]"
                                    : "font-normal text-[#284054] hover:text-[#15293A]"
                              )}
                            >
                              <span>{pillar.name}</span>
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 transition-all duration-150",
                                  isHovered || isSelectedRoute
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0"
                                )}
                              />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOfferingSelect(null)}
                    className={cn(
                      "mt-6 inline-flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer w-fit",
                      isImmersive
                        ? "text-white/85 hover:text-white"
                        : "text-[#135126] hover:text-[#15293A]"
                    )}
                  >
                    <span>All 6 offerings</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Column 2: Dynamic Deliverables Submenu */}
                <div className="col-span-3">
                  <p
                    className={cn(
                      "mb-4 text-[11px] font-medium uppercase tracking-[0.12em]",
                      isImmersive ? "text-white/80" : "text-[#334A5C]"
                    )}
                  >
                    {previewStrength.name} Scope
                  </p>
                  <ul className="space-y-2.5">
                    {previewStrength.deliverables.map((deliverable) => (
                      <li key={deliverable}>
                        <button
                          type="button"
                          onClick={() =>
                            handleOfferingSelect(previewStrength.id)
                          }
                          className={cn(
                            "text-left text-sm transition-colors duration-150 cursor-pointer focus-visible:outline-none",
                            isImmersive
                              ? "text-white/80 hover:text-white"
                              : "text-[#15293A]/85 hover:text-[#135126]"
                          )}
                        >
                          {deliverable}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p
                    className={cn(
                      "mt-5 text-xs tabular-nums",
                      isImmersive ? "text-white/75" : "text-[#334A5C]"
                    )}
                  >
                    Typical window: {previewStrength.engagementWindow}
                  </p>
                </div>

                {/* Column 3: Spotlight Blueprint Preview Card */}
                <div className="col-span-3">
                  <p
                    className={cn(
                      "mb-4 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em]",
                      isImmersive ? "text-white/80" : "text-[#334A5C]"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={
                        isImmersive ? "text-[#FFE27A]" : "text-[#135126]"
                      }
                    >
                      ✦
                    </span>
                    <span>Spotlight</span>
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setMegaOpen(false);
                      onNavigate("possibilities", spotlightBlueprint.slug);
                    }}
                    className="group block w-full text-left cursor-pointer focus-visible:outline-none"
                  >
                    <h4
                      className={cn(
                        "font-display text-sm font-semibold leading-snug transition-colors line-clamp-2",
                        isImmersive
                          ? "text-white group-hover:text-[#FFE27A]"
                          : "text-[#15293A] group-hover:text-[#135126]"
                      )}
                    >
                      {spotlightBlueprint.title}
                    </h4>
                    <p
                      className={cn(
                        "mt-1.5 text-xs leading-relaxed line-clamp-3",
                        isImmersive ? "text-white/85" : "text-[#334A5C]"
                      )}
                    >
                      {spotlightBlueprint.summary}
                    </p>
                    <div
                      className={cn(
                        "mt-4 grid grid-cols-3 gap-2 rounded-[4px] border p-3 transition-colors",
                        isImmersive
                          ? "border-white/20 bg-[#0B1712]/35 group-hover:border-white/35"
                          : "border-[#D0CDD3]/80 bg-[#FAFBF7] group-hover:border-[#135126]/35"
                      )}
                    >
                      {spotlightBlueprint.metrics.map((metric) => (
                        <div key={metric.label} className="min-w-0">
                          <p
                            className={cn(
                              "font-display text-xs font-bold tabular-nums truncate",
                              isImmersive ? "text-[#FFE27A]" : "text-[#135126]"
                            )}
                          >
                            {metric.value}
                          </p>
                          <p
                            className={cn(
                              "mt-0.5 text-[10px] leading-tight line-clamp-2",
                              isImmersive ? "text-white/80" : "text-[#334A5C]"
                            )}
                          >
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p
                      className={cn(
                        "mt-2.5 text-xs",
                        isImmersive ? "text-white/75" : "text-[#334A5C]"
                      )}
                    >
                      {spotlightBlueprint.category} ·{" "}
                      {spotlightBlueprint.readTime}
                    </p>
                  </button>
                </div>

                {/* Column 4: Editorial Summary & Action */}
                <div
                  className={cn(
                    "col-span-3 flex flex-col justify-between border-l pl-6 lg:pl-8",
                    isImmersive ? "border-white/15" : "border-[#D0CDD3]/60"
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        isImmersive ? "text-white/90" : "text-[#334A5C]"
                      )}
                    >
                      {previewStrength.description}
                    </p>
                    <p
                      className={cn(
                        "mt-4 text-xs leading-relaxed",
                        isImmersive ? "text-white/75" : "text-[#334A5C]"
                      )}
                    >
                      Outcome: {previewStrength.outcome}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-col items-start gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleOfferingSelect(previewStrength.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer",
                        isImmersive
                          ? "text-white hover:text-[#FFE27A]"
                          : "text-[#135126] hover:text-[#15293A]"
                      )}
                    >
                      <span>Explore {previewStrength.name}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMegaOpen(false);
                        onOpenBrief("brief", previewStrength.name);
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer",
                        isImmersive
                          ? "text-white/80 hover:text-white"
                          : "text-[#334A5C] hover:text-[#135126]"
                      )}
                    >
                      <span>Scope {previewStrength.name} priority</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
