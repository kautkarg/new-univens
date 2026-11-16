import React, { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  CASE_STUDIES,
  CORE_STRENGTHS,
  FAQS,
  IMAGES,
  POSSIBILITIES_BLUEPRINTS,
  PLATFORMS_AND_EVENTS,
  PROCESS_STEPS,
  PageRoute,
  TESTIMONIALS,
} from "../data/univensData";
import { cn } from "../lib/utils";
import { CxoBriefSelector } from "../components/CxoBriefSelector";
import { ResilientImage } from "../components/ResilientImage";
import { GeometricFrame } from "../components/UnivensLogo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

interface HomePageProps {
  onNavigate: (page: PageRoute, blueprintSlug?: string) => void;
  onOpenBrief: (
    defaultMode?: "brief" | "opportunities",
    strength?: string
  ) => void;
}

const HERO_SLIDES = [
  {
    src: IMAGES.heroLandscape,
    alt: "Tranquil green valley and calm alpine lake beneath an expansive morning sky",
    caption: "Clarity & Perspective",
  },
  {
    src: IMAGES.founderWorkspace,
    alt: "Business leaders discussing strategic execution at a timber table surrounded by greenery",
    caption: "Strategic Partnership",
  },
  {
    src: IMAGES.architectureHub,
    alt: "Modern sunlit technology hub courtyard in India conveying scale and precision",
    caption: "Indian Capabilities",
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBrief,
}) => {
  const [activeStrength, setActiveStrength] = useState(CORE_STRENGTHS[0].id);
  const [activeProcessStep, setActiveProcessStep] = useState<string>("02");
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const scrollToProcess = () => {
    const el = document.getElementById("how-we-work");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION — Full-Screen Background Slideshow & Bottom-Left Editorial Composition */}
      <section
        data-hero-section
        className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-[#15293A]"
      >
        {/* Crossfading Full-Bleed Background Slideshow */}
        <div aria-hidden="true" className="absolute inset-0 z-0">
          <AnimatePresence mode="sync">
            <motion.div
              key={HERO_SLIDES[activeSlide].src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <img
                src={HERO_SLIDES[activeSlide].src}
                alt={HERO_SLIDES[activeSlide].alt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>

          {/* Top Scrim for Immersive Navbar Legibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0D1B14]/55 via-[#0D1B14]/20 to-transparent" />

          {/* Smooth Lower-Half Gradient Scrim for Bottom-Left Hero Copy & Client Strip */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1712]/95 via-[#0F2119]/55 to-transparent" />
        </div>

        {/* Bottom-Left Editorial Content */}
        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-5 pt-28 pb-7 sm:px-6 sm:pt-32 sm:pb-10 lg:px-6 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl text-left"
          >
            <h1 className="font-sans text-[32px] font-semibold leading-[1.12] tracking-[-0.025em] text-white sm:text-5xl lg:text-[56px]">
              Global ambition, Indian capabilities
            </h1>

            <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-4 sm:text-base lg:text-lg">
              Connect with India&apos;s talent, business ecosystem and
              opportunities to turn business priorities into accountable
              execution.
            </p>

            {/* Dual Action Buttons — Always arranged in a sleek horizontal row */}
            <div className="mt-6 flex flex-row items-center justify-start gap-2 sm:mt-7 sm:gap-3.5">
              <button
                type="button"
                onClick={() => onOpenBrief("brief")}
                className="inline-flex h-10 items-center justify-center rounded-full bg-white px-4 text-xs font-semibold text-[#15293A] whitespace-nowrap shadow-sm transition-all duration-150 hover:bg-[#FAFBF7] active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBB40] sm:h-11 sm:px-6 sm:text-sm"
              >
                Let&apos;s explore what&apos;s possible
              </button>

              <button
                type="button"
                onClick={scrollToProcess}
                className="inline-flex h-10 items-center justify-start gap-2 rounded-full border border-white/25 bg-white/15 pl-3.5 pr-1 text-xs font-medium text-white whitespace-nowrap backdrop-blur-md transition-all duration-150 hover:bg-white/25 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-11 sm:gap-3 sm:pl-5 sm:pr-1.5 sm:text-sm"
              >
                <span>How It Works</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#15293A] sm:h-8 sm:w-8">
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Integrated Bottom-Left Client Dummy Logos Strip */}
          <div className="mt-8 border-t border-white/15 pt-5 sm:mt-11 sm:pt-6">
            <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-3 sm:gap-x-10 lg:gap-x-12">
              {/* Logo 1 */}
              <div className="inline-flex items-center gap-2 text-white/45 select-none">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 4V20M4 12H20"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  />
                </svg>
                <span className="font-display text-xs font-semibold tracking-tight sm:text-sm">
                  meridian
                </span>
              </div>

              {/* Logo 2 */}
              <div className="inline-flex items-center gap-2 text-white/85 select-none">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                >
                  <path d="M12 2L14.8 9.2L22 12L14.8 14.8L12 22L9.2 14.8L2 12L9.2 9.2L12 2Z" />
                </svg>
                <span className="font-display text-sm font-medium tracking-tight sm:text-base">
                  luminous
                </span>
              </div>

              {/* Logo 3 */}
              <div className="inline-flex items-center gap-2 text-white/85 select-none">
                <svg
                  viewBox="0 0 28 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-3.5 w-5 sm:h-4 sm:w-6"
                >
                  <circle cx="9" cy="10" r="6" fillOpacity="0.45" />
                  <circle cx="17" cy="10" r="6" />
                </svg>
                <span className="font-display text-sm font-semibold tracking-tight sm:text-base">
                  Verve
                </span>
              </div>

              {/* Logo 4 */}
              <div className="inline-flex items-center gap-2 text-white/85 select-none">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-[2px] bg-white text-[10px] font-bold text-[#15293A] sm:h-5 sm:w-5 sm:text-[11px]">
                  K
                </span>
                <span className="font-display text-xs font-semibold tracking-[0.14em] uppercase sm:text-sm">
                  Kinetix
                </span>
              </div>

              {/* Logo 5 */}
              <div className="inline-flex items-center gap-2 text-white/45 select-none">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                >
                  <rect
                    x="3"
                    y="3"
                    width="8"
                    height="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <rect
                    x="13"
                    y="13"
                    width="8"
                    height="8"
                    fill="currentColor"
                  />
                  <rect
                    x="13"
                    y="3"
                    width="8"
                    height="8"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <span className="font-display text-xs font-bold tracking-[0.16em] uppercase sm:text-sm">
                  Aranya
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION — Full-Viewport Breathable Split & Track Pair */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-sm font-medium text-[#135126]">
                Why Univens Exists
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-4xl lg:text-[44px]">
                Connect opportunity with capability.
              </h2>
              <p className="max-w-md text-base leading-relaxed text-[#555555]">
                Running a business requires attention across several fronts.
                Day-to-day operations need to run, priorities need to be
                addressed and new opportunities need to be considered.
              </p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7 space-y-12">
              <p className="text-xl leading-[1.5] text-[#15293A] sm:text-2xl">
                Univens works alongside business leaders to manage these
                requirements, bring in the right capabilities and help turn
                opportunities into action—without having to build every
                capability in-house.
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex min-h-[250px] flex-col justify-between rounded-[6px] border border-[#D0CDD3]/90 bg-[#FAFBF7] p-8">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-[#15293A]">
                      For Founders &amp; CXOs
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#555555]">
                      Share what you are trying to achieve without needing a
                      perfectly defined technical specification upfront.
                    </p>
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => onOpenBrief("brief")}
                      className="inline-flex items-center gap-2.5 rounded-[4px] border border-[#D0CDD3] bg-white px-4 py-2.5 text-xs font-semibold text-[#15293A] transition-colors hover:border-[#135126] cursor-pointer"
                    >
                      <span>Start a Brief</span>
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-[2px] bg-[#15293A] text-white">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Selective Forest Green Anchor Card */}
                <div className="flex min-h-[250px] flex-col justify-between rounded-[6px] bg-[#135126] p-8 text-white">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      For Consultants &amp; Partners
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#DEEFE4]">
                      Access dependable Indian engineering, integration, and
                      delivery capacity to scale outcomes for your clients.
                    </p>
                  </div>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => onOpenBrief("brief", "Expansion")}
                      className="inline-flex items-center gap-2.5 rounded-[4px] bg-white px-4 py-2.5 text-xs font-semibold text-[#15293A] transition-colors hover:bg-[#FAFBF7] cursor-pointer"
                    >
                      <span>Partner With Us</span>
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-[2px] bg-[#15293A] text-white">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW WE DO IT — Full-Viewport Architectural Stepper */}
      <section
        id="how-we-work"
        className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 sage-mist-band py-24 lg:py-32"
      >
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-sm font-medium text-[#135126]">How We Work</p>
              <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-4xl lg:text-[42px]">
                From business priority to accountable delivery.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <p className="text-base leading-relaxed text-[#555555]">
                CXOs like Sharad, Shahana and Harsh approach us with specific
                business requirements across different domains. We define clear
                deliverables, assemble the right expertise, and take ownership.
              </p>
              <div className="font-display text-4xl font-light text-[#15293A] tabular-nums shrink-0">
                <span className="font-semibold text-[#135126]">
                  {activeProcessStep}
                </span>
                <span className="text-lg text-[#555555]">/04</span>
              </div>
            </div>
          </div>

          {/* 4-Step Spacious Grid */}
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
            {PROCESS_STEPS.map((item) => {
              const isFocused = activeProcessStep === item.step;
              return (
                <button
                  key={item.step}
                  type="button"
                  onClick={() => setActiveProcessStep(item.step)}
                  className={cn(
                    "flex min-h-[290px] flex-col justify-between rounded-[6px] p-8 text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#135126]",
                    isFocused
                      ? "bg-[#135126] text-white shadow-sm"
                      : "glass-panel hover:border-[#135126]/60 text-[#15293A]"
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-between gap-2 pb-5 border-b",
                      isFocused ? "border-white/20" : "border-[#D0CDD3]/70"
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-sm font-bold tabular-nums",
                        isFocused ? "text-[#FFBB40]" : "text-[#135126]"
                      )}
                    >
                      Step {item.step}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-6",
                        isFocused ? "bg-[#FFBB40]" : "bg-[#D0CDD3]"
                      )}
                    />
                  </div>
                  <div className="pt-8">
                    <h3
                      className={cn(
                        "font-display text-xl font-semibold leading-snug",
                        isFocused ? "text-white" : "text-[#15293A]"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-3.5 text-sm leading-relaxed",
                        isFocused ? "text-[#DEEFE4]" : "text-[#555555]"
                      )}
                    >
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OUR CORE STRENGTHS — Full-Viewport Open Editorial Capability Spread */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-medium text-[#135126]">
                Our Core Strengths
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-4xl lg:text-[42px]">
                Six capabilities aligned around real business outcomes.
              </h2>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate("offerings")}
            >
              View Full Offerings
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <Tabs
            value={activeStrength}
            onValueChange={setActiveStrength}
            className="mt-14 lg:mt-16"
          >
            <TabsList className="h-auto w-full flex-wrap justify-start gap-x-8 gap-y-3 rounded-none border-b border-[#D0CDD3]/80 bg-transparent p-0">
              {CORE_STRENGTHS.map((pillar) => (
                <TabsTrigger
                  key={pillar.id}
                  value={pillar.id}
                  className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-4 pt-1 font-display text-sm sm:text-base text-[#555555] hover:text-[#15293A] data-[state=active]:border-[#135126] data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-[#135126] data-[state=active]:shadow-none"
                >
                  <span className="mr-1.5 text-xs opacity-70 tabular-nums">
                    {pillar.index}.
                  </span>
                  {pillar.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {CORE_STRENGTHS.map((pillar) => (
              <TabsContent key={pillar.id} value={pillar.id} className="mt-12 lg:mt-14">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
                  <div className="lg:col-span-5 space-y-6">
                    <p className="text-xs font-medium text-[#135126] tabular-nums">
                      {pillar.index} · Typical Horizon: {pillar.engagementWindow}
                    </p>
                    <h3 className="font-display text-3xl font-bold leading-tight text-[#15293A] sm:text-4xl">
                      {pillar.tagline}
                    </h3>
                    <p className="text-base leading-relaxed text-[#555555]">
                      {pillar.description}
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => onOpenBrief("brief", pillar.name)}
                        className="inline-flex h-11 items-center gap-3 rounded-[4px] bg-[#135126] pl-5 pr-2.5 text-sm font-medium text-white transition-colors hover:bg-[#0e3f1d] cursor-pointer"
                      >
                        <span>Scope {pillar.name} with Univens</span>
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-[2px] bg-white text-[#135126]">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 lg:col-start-7 space-y-10">
                    <div>
                      <h4 className="mb-4 font-display text-sm font-semibold text-[#15293A]">
                        Core Deliverables Under {pillar.name}
                      </h4>
                      <ul className="grid gap-x-8 border-t border-[#D0CDD3]/80 sm:grid-cols-2">
                        {pillar.deliverables.map((deliv) => (
                          <li
                            key={deliv}
                            className="flex items-center gap-3 border-b border-[#D0CDD3]/50 py-4 text-sm text-[#15293A]"
                          >
                            <Check className="h-4 w-4 shrink-0 text-[#135126]" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-[#15293A]/15 pt-6">
                      <p className="text-xs font-medium text-[#555555]">
                        Expected Business Outcome
                      </p>
                      <p className="mt-2 font-display text-lg font-semibold leading-snug text-[#15293A]">
                        {pillar.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* 5. POSSIBILITIES — Full-Viewport Open Editorial Blueprint Grid */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-medium text-[#135126]">
                Possibilities &amp; Blueprints
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-4xl lg:text-[42px]">
                Planning-to-impact flows for practical execution.
              </h2>
              <p className="text-base leading-relaxed text-[#555555]">
                Explore structured blueprints showing how growing enterprises
                combine strategy, technology, and Indian capabilities.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate("possibilities")}
            >
              All Blueprints
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:mt-20 lg:gap-x-20 lg:gap-y-16">
            {POSSIBILITIES_BLUEPRINTS.slice(0, 4).map((bp) => (
              <article
                key={bp.slug}
                className="group flex flex-col justify-between border-t border-[#D0CDD3] pt-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-[#555555] tabular-nums">
                    <span className="font-medium text-[#135126]">
                      {bp.published}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{bp.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{bp.readTime}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold leading-snug text-[#15293A] transition-colors group-hover:text-[#135126]">
                    {bp.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-[#555555] sm:text-base">
                    {bp.summary}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between pt-4">
                  <span className="text-xs font-medium text-[#15293A] tabular-nums">
                    Impact: {bp.metrics[0].value} {bp.metrics[0].label}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate("possibilities", bp.slug)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#135126] hover:underline cursor-pointer"
                  >
                    Read Blueprint
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROVEN EXECUTION (CASE STUDIES) — Dedicated Full-Viewport Proof Showcase */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm font-medium text-[#135126]">
                Proven Execution
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-4xl lg:text-[42px]">
                See how Univens is helping clients move forward.
              </h2>
            </div>
            <Button
              variant="outline"
              onClick={() => onNavigate("case-studies")}
            >
              Explore All Case Studies
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Case Study Columns with Center Forest Green Anchor */}
          <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-3">
            {CASE_STUDIES.map((cs, index) => {
              const isFeatured = index === 1;
              return (
                <Card
                  key={cs.id}
                  className={cn(
                    "flex min-h-[420px] flex-col justify-between p-2",
                    isFeatured
                      ? "border-[#135126] bg-[#135126] text-white"
                      : "bg-[#FAFBF7] text-[#15293A]"
                  )}
                >
                  <CardHeader className="space-y-4 p-6 pb-4">
                    <div
                      className={cn(
                        "text-xs",
                        isFeatured ? "text-[#DEEFE4]" : "text-[#555555]"
                      )}
                    >
                      <span>{cs.client}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{cs.sector}</span>
                    </div>
                    <div
                      className={cn(
                        "border-b pb-5",
                        isFeatured
                          ? "border-white/20"
                          : "border-[#D0CDD3]/80"
                      )}
                    >
                      <p
                        className={cn(
                          "font-display text-4xl font-bold tabular-nums",
                          isFeatured ? "text-[#FFBB40]" : "text-[#135126]"
                        )}
                      >
                        {cs.outcomeMetric}
                      </p>
                      <p
                        className={cn(
                          "mt-1.5 text-xs",
                          isFeatured ? "text-[#DEEFE4]" : "text-[#555555]"
                        )}
                      >
                        {cs.outcomeContext}
                      </p>
                    </div>
                    <CardTitle
                      className={cn(
                        "text-xl leading-snug pt-2",
                        isFeatured ? "text-white" : "text-[#15293A]"
                      )}
                    >
                      {cs.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 p-6 pt-2">
                    <p
                      className={cn(
                        "text-sm leading-relaxed",
                        isFeatured ? "text-white/90" : "text-[#555555]"
                      )}
                    >
                      {cs.execution}
                    </p>
                    <div
                      className={cn(
                        "grid grid-cols-3 gap-3 border-t pt-5",
                        isFeatured
                          ? "border-white/20"
                          : "border-[#D0CDD3]/70"
                      )}
                    >
                      {cs.secondaryMetrics.map((m) => (
                        <div key={m.label}>
                          <p
                            className={cn(
                              "font-display text-sm font-bold tabular-nums",
                              isFeatured ? "text-white" : "text-[#15293A]"
                            )}
                          >
                            {m.value}
                          </p>
                          <p
                            className={cn(
                              "mt-0.5 text-[11px]",
                              isFeatured ? "text-[#DEEFE4]" : "text-[#555555]"
                            )}
                          >
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. EXECUTIVE PERSPECTIVES — Dedicated Full-Viewport Testimonial Spread */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-medium text-[#135126]">
              Executive Testimonials
            </p>
            <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-4xl lg:text-[42px]">
              Perspectives from leaders we work alongside.
            </h2>
          </div>

          <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-3 lg:gap-14">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="flex flex-col justify-between border-t border-[#D0CDD3] pt-8"
              >
                <div className="space-y-5">
                  <p className="text-xs font-medium text-[#135126]">
                    {t.context}
                  </p>
                  <p className="text-base leading-relaxed text-[#15293A] sm:text-lg">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <footer className="mt-10 border-t border-[#D0CDD3]/60 pt-5">
                  <p className="font-display text-sm font-semibold text-[#15293A]">
                    {t.author}
                  </p>
                  <p className="mt-0.5 text-xs text-[#555555]">
                    {t.role}, {t.company}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WORD FROM DIRECTOR & PLATFORMS / EVENTS — Full-Viewport Editorial Split */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-7">
              <div className="grid gap-8 sm:grid-cols-12 sm:items-center">
                <div className="sm:col-span-5">
                  <ResilientImage
                    src={IMAGES.directorPortrait}
                    alt="Executive Director at Univens seated in natural daylight"
                    aspectClassName="aspect-[4/5] w-full"
                    fallbackTitle="Word from the Director"
                  />
                </div>
                <div className="sm:col-span-7 space-y-6">
                  <p className="text-xs font-medium text-[#135126]">
                    Word from the Director
                  </p>
                  <blockquote className="font-display text-2xl font-semibold leading-[1.3] text-[#15293A] sm:text-[28px]">
                    &ldquo;Clarity comes first. Complexity comes later. Trust is
                    built through consistent action.&rdquo;
                  </blockquote>
                  <p className="text-sm leading-relaxed text-[#555555] sm:text-base">
                    Decision-makers carry enough noise in their daily calendars.
                    We built Univens as a dependable partner—so you can bring a
                    business ambition to the table and rely on thoughtful,
                    accountable execution from day one.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D0CDD3]/70 pt-5">
                    <div>
                      <p className="font-display text-sm font-semibold text-[#15293A]">
                        Leadership Desk, Univens
                      </p>
                      <p className="text-xs text-[#555555]">
                        Guided by Human Potential (मानवसंभावना)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate("about")}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#135126] hover:underline cursor-pointer"
                    >
                      <span>Our Philosophy</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#135126]">
                  Platforms &amp; Executive Events
                </p>
                <h3 className="font-display text-2xl font-bold text-[#15293A] sm:text-3xl">
                  Stay connected to India&apos;s ecosystem
                </h3>
              </div>
              <div className="divide-y divide-[#D0CDD3]/70 border-y border-[#D0CDD3]/70">
                {PLATFORMS_AND_EVENTS.map((item) => (
                  <div key={item.title} className="py-6">
                    <div className="flex items-center justify-between text-xs text-[#555555]">
                      <span className="font-medium text-[#135126]">
                        {item.type}
                      </span>
                      <span>{item.schedule}</span>
                    </div>
                    <h4 className="mt-2 font-display text-lg font-semibold text-[#15293A]">
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#555555]">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS — Full-Viewport Spacious Q&A */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-sm font-medium text-[#135126]">FAQ</p>
              <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="text-base leading-relaxed text-[#555555]">
                Clear answers on how Univens partners with businesses, global
                leaders, and commercial partners.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="py-2">
                    <AccordionTrigger className="py-5 text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CONVERSION BAND — Full-Viewport Sage Mist & Glass Selector */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden sage-mist-band py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 fluted-glass-overlay opacity-50"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5 space-y-6">
              <GeometricFrame
                accentColor="#FFBB40"
                className="inline-block bg-white/80 backdrop-blur-sm p-3"
              >
                <p className="text-xs font-medium text-[#135126]">
                  Your Next Step
                </p>
              </GeometricFrame>
              <h2 className="font-display text-3xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-4xl lg:text-[42px]">
                Register to stay updated with opportunities of your interest.
              </h2>
              <p className="text-base leading-relaxed text-[#555555]">
                Whether you have an immediate execution priority or want curated
                updates on relevant India technology and commercial openings,
                share your context here.
              </p>
              <ul className="space-y-3.5 pt-4 text-sm text-[#15293A]">
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#135126]" />
                  <span>No perfectly defined scope needed to begin</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#135126]" />
                  <span>Direct response from Univens execution leadership</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="h-4 w-4 text-[#135126]" />
                  <span>Quiet, domain-filtered opportunity briefings</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <CxoBriefSelector initialMode="opportunities" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
