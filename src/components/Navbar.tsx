import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  CORE_STRENGTHS,
  IMAGES,
  POSSIBILITIES_BLUEPRINTS,
  PageRoute,
} from "../data/univensData";
import { cn } from "../lib/utils";
import { UnivensLogo } from "./UnivensLogo";
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

const SPOTLIGHT_MAP: Record<
  string,
  { blueprintIndex: number; image: string; alt: string }
> = {
  presence: {
    blueprintIndex: 2,
    image: IMAGES.heroLandscape,
    alt: "Serene alpine valley representing calm enterprise positioning",
  },
  acquisition: {
    blueprintIndex: 2,
    image: IMAGES.founderWorkspace,
    alt: "Founders aligned around enterprise growth strategy",
  },
  systems: {
    blueprintIndex: 1,
    image: IMAGES.architectureHub,
    alt: "Modern Indian architectural hub representing integrated systems",
  },
  products: {
    blueprintIndex: 0,
    image: IMAGES.architectureHub,
    alt: "Engineering workspace delivering dedicated digital products",
  },
  expansion: {
    blueprintIndex: 3,
    image: IMAGES.founderWorkspace,
    alt: "Commercial leaders collaborating on market expansion",
  },
  direction: {
    blueprintIndex: 0,
    image: IMAGES.heroLandscape,
    alt: "Expansive horizon reflecting strategic clarity",
  },
};

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  activeOfferingId,
  onNavigate,
  onOpenBrief,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHalfHero, setPastHalfHero] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
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
    const checkScroll = () => {
      if (activePage !== "home") {
        setPastHalfHero(true);
        return;
      }
      const heroEl = document.querySelector("[data-hero-section]");
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setPastHalfHero(-rect.top >= rect.height * 0.5);
      } else {
        setPastHalfHero(window.scrollY >= window.innerHeight * 0.5);
      }
    };

    checkScroll();
    window.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [activePage]);

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

  const isImmersive = activePage === "home" && !pastHalfHero;

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
    }, 150);
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
        className="relative inline-flex items-center"
      >
        <a
          href="#offerings"
          aria-expanded={megaOpen}
          aria-haspopup="true"
          onClick={(e) => {
            e.preventDefault();
            if (!megaOpen) {
              openMegaMenu();
            } else {
              handleLinkClick("offerings");
            }
          }}
          className={cn(
            "relative inline-flex items-center gap-1 text-sm whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2",
            immersive
              ? cn(
                  "py-1 rounded-[2px] focus-visible:ring-white",
                  isActive || megaOpen
                    ? "font-normal text-white"
                    : "font-light text-white/80 hover:text-white"
                )
              : cn(
                  "px-2.5 py-1.5 rounded-full focus-visible:ring-[#135126]",
                  isActive || megaOpen
                    ? "font-semibold text-[#135126] bg-[#135126]/[0.06]"
                    : "font-medium text-[#555555] hover:text-[#135126] hover:bg-[#135126]/[0.04]"
                )
          )}
        >
          <span>Offerings</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform duration-200",
              megaOpen && "rotate-180"
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
        className={cn(
          "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isImmersive && !megaOpen
            ? "bg-transparent border-b-0 md:border-b md:border-white/25"
            : isImmersive && megaOpen
              ? "bg-transparent md:bg-[#0B1712]/90 md:backdrop-blur-2xl md:border-b md:border-white/10"
              : cn(
                  "bg-transparent border-b-0 md:bg-white/95 md:backdrop-blur-xl md:border-b",
                  megaOpen
                    ? "md:border-[#D0CDD3]/50"
                    : "md:border-[#15293A]/10 md:shadow-[0_8px_30px_-10px_rgba(21,41,58,0.10),0_1px_3px_rgba(21,41,58,0.04)]"
                )
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isImmersive
              ? "flex h-[72px] md:h-16 items-center justify-between gap-6"
              : "flex h-[72px] md:h-16 items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr]"
          )}
        >
          {/* Left Zone: Circular white island mark on mobile, full wordmark on desktop */}
          <div className="flex items-center justify-start">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick("home");
              }}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_6px_20px_-4px_rgba(11,23,18,0.18)] ring-1 ring-[#15293A]/[0.08] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] md:h-auto md:w-auto md:rounded-[4px] md:bg-transparent md:py-1 md:shadow-none md:ring-0 md:hover:scale-100 md:hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126]"
              aria-label="Univens Home"
            >
              <UnivensLogo
                variant="mark"
                surface="light"
                className="h-5 w-5 md:hidden"
              />
              <UnivensLogo
                variant="topbar"
                surface={isImmersive ? "dark" : "light"}
                className="hidden md:inline-flex"
              />
            </a>
          </div>

          {/* Center Zone (when scrolled): Clean centered horizontal links */}
          {!isImmersive && (
            <nav
              aria-label="Primary Navigation"
              className="hidden md:flex items-center justify-center gap-1 lg:gap-2"
            >
              {NAV_LINKS.map((item) => {
                if (item.route === "offerings") {
                  return renderOfferingsTrigger(false);
                }
                const isActive = activePage === item.route;
                return (
                  <a
                    key={item.route}
                    href={`#${item.route}`}
                    onMouseEnter={scheduleCloseMegaMenu}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.route);
                    }}
                    className={cn(
                      "relative inline-flex items-center px-2.5 py-1.5 rounded-full text-sm whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126]",
                      isActive
                        ? "font-semibold text-[#135126]"
                        : "font-medium text-[#555555] hover:text-[#135126] hover:bg-[#135126]/[0.04]"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          )}

          {/* Right Zone */}
          <div
            className={cn(
              "flex items-center justify-end",
              isImmersive ? "gap-6 lg:gap-7" : "gap-3 lg:gap-4"
            )}
          >
            {isImmersive && (
              <nav
                aria-label="Primary Navigation"
                className="hidden md:flex items-center gap-6 lg:gap-7"
              >
                {NAV_LINKS.map((item) => {
                  if (item.route === "offerings") {
                    return renderOfferingsTrigger(true);
                  }
                  const isActive = activePage === item.route;
                  return (
                    <a
                      key={item.route}
                      href={`#${item.route}`}
                      onMouseEnter={scheduleCloseMegaMenu}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(item.route);
                      }}
                      className={cn(
                        "relative py-1 rounded-[2px] text-sm whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
                        isActive
                          ? "font-normal text-white"
                          : "font-light text-white/80 hover:text-white"
                      )}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </nav>
            )}

            {/* Primary Action + Contact Utility Link + Mobile Trigger */}
            <div className="flex items-center gap-3 lg:gap-4 shrink-0">
              {!isImmersive && (
                <a
                  href="#contact"
                  onMouseEnter={scheduleCloseMegaMenu}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick("contact");
                  }}
                  className={cn(
                    "hidden lg:inline-flex items-center px-2.5 py-1.5 rounded-full text-sm whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126]",
                    activePage === "contact"
                      ? "font-semibold text-[#135126]"
                      : "font-medium text-[#555555] hover:text-[#135126] hover:bg-[#135126]/[0.04]"
                  )}
                >
                  Contact
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  setMegaOpen(false);
                  onOpenBrief("brief");
                }}
                className={cn(
                  "group hidden md:inline-flex items-center justify-center rounded-full text-sm font-medium whitespace-nowrap shrink-0 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126]",
                  isImmersive
                    ? "h-9 border border-white/40 bg-white/95 px-5 text-[#135126] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.2)] hover:bg-white active:scale-[0.98]"
                    : "h-10 gap-1.5 bg-gradient-to-r from-[#135126] to-[#1A6B33] pl-5 pr-4 text-white shadow-[0_6px_20px_-4px_rgba(19,81,38,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] hover:brightness-105 hover:shadow-[0_10px_24px_-4px_rgba(19,81,38,0.42)] active:scale-[0.98]"
                )}
              >
                <span>Explore Possibilities</span>
                {!isImmersive && (
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-[1px] group-hover:-translate-y-[1px]" />
                )}
              </button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open navigation menu"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#15293A] shadow-[0_6px_20px_-4px_rgba(11,23,18,0.18)] ring-1 ring-[#15293A]/[0.08] md:hidden cursor-pointer transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126]"
                  >
                    <span
                      aria-hidden="true"
                      className="flex flex-col items-center justify-center gap-[5px]"
                    >
                      <span className="block h-[1.5px] w-4 rounded-full bg-current" />
                      <span className="block h-[1.5px] w-4 rounded-full bg-current" />
                    </span>
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="bottom"
                  hideCloseButton
                  overlayClassName="bg-[#0B1712]/50 backdrop-blur-md"
                  className="flex flex-col gap-5 overflow-y-auto p-5 md:hidden"
                >
                  <SheetTitle className="sr-only">
                    Univens Mobile Navigation
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Browse Univens offerings, company pages, and capability blueprints.
                  </SheetDescription>

                  {/* Top Row: Univens Logo Aligned Top Left */}
                  <div className="flex items-center justify-start">
                    <button
                      type="button"
                      onClick={() => handleLinkClick("home")}
                      aria-label="Univens Home"
                      className="inline-flex items-center rounded-[8px] py-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126]"
                    >
                      <UnivensLogo variant="topbar" surface="light" />
                    </button>
                  </div>

                  {/* Two-Column Directory Presentation */}
                  <nav
                    aria-label="Mobile Navigation"
                    className="grid grid-cols-2 gap-x-5 pt-1"
                  >
                    {/* Left Column: Offerings + Contact Button */}
                    <div className="flex flex-col justify-between border-r border-[#15293A]/[0.07] pr-4">
                      <div>
                        <p className="mb-3 text-[13px] font-semibold tracking-tight text-[#15293A]">
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
                                    "block w-full text-left text-[13.5px] transition-colors cursor-pointer",
                                    isSelected
                                      ? "font-semibold text-[#135126]"
                                      : "font-normal text-[#555555]/85 hover:text-[#135126]"
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
                        className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-[10px] bg-[#15293A] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#135126] cursor-pointer"
                      >
                        <span>Contact</span>
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Right Column: Company, Insights, Engage */}
                    <div className="flex flex-col justify-between pl-1">
                      <div>
                        <p className="mb-2.5 text-[13px] font-semibold tracking-tight text-[#15293A]">
                          Company
                        </p>
                        <ul className="space-y-2.5">
                          <li>
                            <button
                              type="button"
                              onClick={() => handleLinkClick("home")}
                              className={cn(
                                "block w-full text-left text-[13.5px] transition-colors cursor-pointer",
                                activePage === "home"
                                  ? "font-semibold text-[#135126]"
                                  : "font-normal text-[#555555]/85 hover:text-[#135126]"
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
                                "block w-full text-left text-[13.5px] transition-colors cursor-pointer",
                                activePage === "about"
                                  ? "font-semibold text-[#135126]"
                                  : "font-normal text-[#555555]/85 hover:text-[#135126]"
                              )}
                            >
                              About Us
                            </button>
                          </li>
                        </ul>

                        <p className="mt-5 mb-2.5 text-[13px] font-semibold tracking-tight text-[#15293A]">
                          Insights
                        </p>
                        <ul className="space-y-2.5">
                          <li>
                            <button
                              type="button"
                              onClick={() => handleLinkClick("possibilities")}
                              className={cn(
                                "inline-flex w-full items-center gap-1.5 text-left text-[13.5px] transition-colors cursor-pointer",
                                activePage === "possibilities"
                                  ? "font-semibold text-[#135126]"
                                  : "font-normal text-[#555555]/85 hover:text-[#135126]"
                              )}
                            >
                              <span>Possibilities</span>
                              <span className="text-[11px] font-medium text-[#135126]">
                                New
                              </span>
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              onClick={() => handleLinkClick("case-studies")}
                              className={cn(
                                "block w-full text-left text-[13.5px] transition-colors cursor-pointer",
                                activePage === "case-studies"
                                  ? "font-semibold text-[#135126]"
                                  : "font-normal text-[#555555]/85 hover:text-[#135126]"
                              )}
                            >
                              Case Studies
                            </button>
                          </li>
                        </ul>

                        <p className="mt-5 mb-2.5 text-[13px] font-semibold tracking-tight text-[#15293A]">
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
                              className="block w-full text-left text-[13.5px] font-normal text-[#555555]/85 transition-colors hover:text-[#135126] cursor-pointer"
                            >
                              Share a Brief
                            </button>
                          </li>
                          <li>
                            <button
                              type="button"
                              onClick={() => handleOfferingSelect(null)}
                              className={cn(
                                "block w-full text-left text-[13.5px] transition-colors cursor-pointer",
                                activePage === "offerings" && !activeOfferingId
                                  ? "font-semibold text-[#135126]"
                                  : "font-normal text-[#555555]/85 hover:text-[#135126]"
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
                    className="group relative flex min-h-[168px] w-full flex-col justify-between overflow-hidden rounded-[14px] p-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126]"
                  >
                    <img
                      src={IMAGES.heroLandscape}
                      alt="Univens capability horizon"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0B1712]/75 via-[#0B1712]/40 to-[#0B1712]/85" />

                    <div className="relative z-10">
                      <p className="text-[11px] font-medium text-white/75">
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
            className={cn(
              "fixed left-0 right-0 top-16 z-40 hidden md:block border-b transition-colors duration-200",
              isImmersive
                ? "border-white/15 bg-[#0B1712]/90 text-white backdrop-blur-2xl shadow-[0_28px_60px_-15px_rgba(0,0,0,0.6)]"
                : "border-[#D0CDD3]/80 bg-white/96 text-[#15293A] backdrop-blur-2xl shadow-[0_24px_48px_-12px_rgba(21,41,58,0.14)]"
            )}
          >
            <div className="mx-auto w-full max-w-[1920px] px-4 py-8 sm:px-6 lg:px-6 lg:py-10">
              <div className="grid grid-cols-12 gap-8 lg:gap-10">
                {/* Column 1: Core Offering Pillars */}
                <div className="col-span-3 flex flex-col justify-between">
                  <div>
                    <p
                      className={cn(
                        "mb-4 text-[11px] font-medium uppercase tracking-[0.12em]",
                        isImmersive ? "text-white/50" : "text-[#555555]/80"
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
                                    : "font-normal text-white/60 hover:text-white"
                                  : isHovered || isSelectedRoute
                                    ? "font-semibold text-[#135126]"
                                    : "font-normal text-[#555555] hover:text-[#15293A]"
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
                        ? "text-white/70 hover:text-white"
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
                      isImmersive ? "text-white/50" : "text-[#555555]/80"
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
                      isImmersive ? "text-white/45" : "text-[#555555]"
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
                      isImmersive ? "text-white/50" : "text-[#555555]/80"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={
                        isImmersive ? "text-[#FFBB40]" : "text-[#135126]"
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
                          ? "text-white group-hover:text-[#FEF8DF]"
                          : "text-[#15293A] group-hover:text-[#135126]"
                      )}
                    >
                      {spotlightBlueprint.title}
                    </h4>
                    <p
                      className={cn(
                        "mt-1.5 text-xs leading-relaxed line-clamp-3",
                        isImmersive ? "text-white/65" : "text-[#555555]"
                      )}
                    >
                      {spotlightBlueprint.summary}
                    </p>
                    <div
                      className={cn(
                        "mt-3.5 aspect-[16/10] w-full overflow-hidden rounded-[4px] border",
                        isImmersive
                          ? "border-white/15 bg-white/5"
                          : "border-[#D0CDD3]/80 bg-[#FAFBF7]"
                      )}
                    >
                      <img
                        src={spotlightConfig.image}
                        alt={spotlightConfig.alt}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <p
                      className={cn(
                        "mt-2.5 text-xs",
                        isImmersive ? "text-white/55" : "text-[#555555]"
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
                    isImmersive ? "border-white/10" : "border-[#D0CDD3]/60"
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        isImmersive ? "text-white/75" : "text-[#555555]"
                      )}
                    >
                      {previewStrength.description}
                    </p>
                    <p
                      className={cn(
                        "mt-4 text-xs leading-relaxed",
                        isImmersive ? "text-white/50" : "text-[#555555]/85"
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
                          ? "text-white hover:text-[#FEF8DF]"
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
                          ? "text-white/65 hover:text-white"
                          : "text-[#555555] hover:text-[#135126]"
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
