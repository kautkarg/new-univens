import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  CASE_STUDIES,
  CORE_STRENGTHS,
  FAQS,
  POSSIBILITIES_BLUEPRINTS,
  PLATFORMS_AND_EVENTS,
  PageRoute,
  TESTIMONIALS,
} from "../data/univensData";
import { cn } from "../lib/utils";
import { CxoBriefSelector } from "../components/CxoBriefSelector";
import { GeometricFrame, UnivensLogo } from "../components/UnivensLogo";
import heroEditorialDesktop from "../assets/images/univens_hero_desktop_1795091633142.jpg";
import heroEditorialMobile from "../assets/images/univens_hero_mobile_v2_1795091656441.jpg";
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

interface HeroSlideMedia {
  src: string;
  alt: string;
  positionClass: string;
  hidden?: boolean;
}

interface HeroSlide {
  id: string;
  caption: string;
  desktop?: HeroSlideMedia;
  mobile?: HeroSlideMedia;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "executive-collaboration-workspace",
    caption: "Global Leadership & Calm Strategic Collaboration",
    desktop: {
      src: heroEditorialDesktop,
      alt: "Candid documentary photograph of business leaders and builders collaborating at a timber table in a calm sunlit architectural workspace with indoor greenery and open views",
      positionClass: "object-[60%_42%]",
      hidden: true,
    },
    mobile: {
      src: heroEditorialMobile,
      alt: "Vertical documentary photograph of business leaders reviewing plans across a walnut timber table in a serene sunlit architectural workspace with greenery and skyline views",
      positionClass: "object-[50%_44%]",
    },
  },
  {
    id: "modern-infrastructure",
    caption: "Modern Infrastructure & Business Capitals",
    desktop: {
      src: "/assets/hero/horizontal/01-mumbai-infra.jpg",
      alt: "Aerial view of the Mumbai Coastal Road expressway interchange and high-rise financial skyline representing modern Indian infrastructure",
      positionClass: "object-center",
      hidden: true,
    },
    mobile: {
      src: "/assets/hero/vertical/01-sea-link-mumbai.jpg",
      alt: "Vertical architectural view of the Bandra-Worli Sea Link cable-stayed bridge in Mumbai",
      positionClass: "object-center",
    },
  },
  {
    id: "product-design-studio",
    caption: "Product Design, Engineering & Creative Studios",
    desktop: {
      src: "/assets/aistudio/image_5f29cd81.png",
      alt: "Product designer working with a stylus tablet and laptop in a collaborative studio alongside an architectural drafter",
      positionClass: "object-[50%_22%]",
    },
  },
  {
    id: "laboratory-systems",
    caption: "Technical Diagnostics & Automated Laboratory Operations",
    desktop: {
      src: "/assets/hero/horizontal/07-lab-engineering.jpg",
      alt: "Indian technician operating an automated diagnostic laboratory analyzer workstation",
      positionClass: "object-[50%_26%]",
    },
  },
  {
    id: "electronics-manufacturing",
    caption: "Precision Electronics & Advanced Manufacturing",
    mobile: {
      src: "/assets/hero/vertical/05-electronics-engineer.jpg",
      alt: "Macro vertical view of a semiconductor microchip and precision electronic circuit assembly",
      positionClass: "object-center",
    },
  },
  {
    id: "renewable-energy",
    caption: "Utility-Scale Renewable & Clean Energy",
    desktop: {
      src: "/assets/hero/horizontal/06-renewable-energy.jpg",
      alt: "Expansive solar photovoltaic arrays and wind turbines at sunrise reflecting clean energy infrastructure scale",
      positionClass: "object-center",
    },
    mobile: {
      src: "/assets/hero/vertical/06-wind-energy.jpg",
      alt: "Vertical view of a utility-scale wind turbine towering beneath a clear blue sky",
      positionClass: "object-center",
    },
  },
  {
    id: "hyderabad-innovation-hub",
    caption: "India's Collaborative Coworking & Innovation Hubs",
    desktop: {
      src: "/assets/hero/horizontal/08-hyderabad-workspace.jpg",
      alt: "Indian builders and product teams collaborating with laptops across tables in a Hyderabad coworking space",
      positionClass: "object-[50%_30%]",
    },
  },
  {
    id: "ecommerce-supply-chain",
    caption: "Global Supply Chains, Fulfillment & Logistics Scale",
    desktop: {
      src: "/assets/hero/horizontal/09-shipping-logistics.jpg",
      alt: "Sealed shipping packages moving down a sunlit automated warehouse conveyor roller line",
      positionClass: "object-center",
    },
  },
];

function useIsVerticalViewport(): boolean {
  const computeIsVertical = () => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(max-width: 767px), (orientation: portrait)")
        .matches ||
      window.innerWidth <= 767 ||
      window.innerHeight > window.innerWidth
    );
  };

  const [isVertical, setIsVertical] = useState<boolean>(computeIsVertical);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px), (orientation: portrait)"
    );
    const update = () => {
      setIsVertical(computeIsVertical());
    };
    update();
    mediaQuery.addEventListener("change", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined" && document.documentElement) {
      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(document.documentElement);
    }

    return () => {
      mediaQuery.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      resizeObserver?.disconnect();
    };
  }, []);

  return isVertical;
}

const INTRO_HEADLINE_WORDS =
  "Running a business requires attention across several fronts. Day-to-day operations need to run, priorities need to be addressed and new opportunities need to be considered.".split(
    " "
  );

const INITIAL_ACTIVE_WORD_COUNT = 2;

interface IntroRevealWordProps {
  word: string;
  index: number;
  progress: MotionValue<number>;
}

const IntroRevealWord: React.FC<IntroRevealWordProps> = ({
  word,
  index,
  progress,
}) => {
  const isInitiallyActive = index < INITIAL_ACTIVE_WORD_COUNT;
  const remainingTotal = Math.max(
    1,
    INTRO_HEADLINE_WORDS.length - INITIAL_ACTIVE_WORD_COUNT
  );
  const stepIndex = Math.max(0, index - INITIAL_ACTIVE_WORD_COUNT);
  const wordWindow = 0.16;
  const finishAt = 1;
  const start =
    remainingTotal > 1
      ? (stepIndex / (remainingTotal - 1)) * (finishAt - wordWindow)
      : 0;
  const end = Math.min(finishAt, start + wordWindow);
  const animatedOpacity = useTransform(progress, [start, end], [0.36, 1]);

  return (
    <motion.span
      style={isInitiallyActive ? undefined : { opacity: animatedOpacity }}
      className="inline-block text-[#15293A]"
    >
      {word}
    </motion.span>
  );
};

const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "start 0.05"],
  });

  // Smoothly damped spring: matches slow scroll 1:1 while gliding visibly across fast flicks,
  // finishing 100% of the reveal cleanly by the time the section fills 100% of the viewport.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 22,
    mass: 0.45,
    restDelta: 0.001,
  });

  return (
    <section
      ref={sectionRef}
      className="intro-cloud-surface section-viewport relative flex flex-col justify-center px-6 pt-[calc(var(--navbar-height,80px)+1.5rem)] pb-[calc(var(--navbar-height,80px)+1.5rem)] sm:px-12 lg:px-20"
    >
      <div className="mx-auto w-full max-w-[320px] sm:max-w-xl lg:max-w-3xl">
        <h2 className="flex flex-wrap gap-x-[0.25em] gap-y-[0.06em] font-sans text-[24px] font-normal leading-[1.24] tracking-[-0.015em] sm:text-[34px] sm:leading-[1.2] lg:text-[42px] lg:leading-[1.18]">
          {INTRO_HEADLINE_WORDS.map((word, idx) => (
            <IntroRevealWord
              key={`${word}-${idx}`}
              word={word}
              index={idx}
              progress={smoothProgress}
            />
          ))}
        </h2>

        <p className="mt-8 max-w-[315px] font-sans text-[15px] font-normal leading-[1.58] text-[#284054] sm:mt-10 sm:max-w-md sm:text-[17px] lg:mt-12 lg:max-w-xl lg:text-[19px]">
          Univens works alongside business leaders to manage these
          requirements, bring in the right capabilities and help turn
          opportunities into action.
        </p>
      </div>
    </section>
  );
};

const VALUE_PROP_INTENTS = [
  {
    id: "needs",
    tab: "Needs",
    heading: "We understand their needs",
    description:
      "Whether an executive brings a growth target, an operational bottleneck, or an early business priority, we clarify the real requirement before resources are committed.",
    actionLabel: "Share a requirement",
    strength: "Direction",
  },
  {
    id: "deliverables",
    tab: "Deliverables",
    heading: "Define clear deliverables",
    description:
      "We translate broad executive priorities into an explicit scope, clear milestones, and measurable outcomes so there is zero ambiguity on what ships.",
    actionLabel: "Define a scope",
    strength: "Direction",
  },
  {
    id: "expertise",
    tab: "Expertise",
    heading: "Bring together the right expertise when needed",
    description:
      "Rather than forcing one rigid team, we assemble vetted engineering, design, automation, and commercial specialists tailored precisely to the problem.",
    actionLabel: "Explore specialist capabilities",
    strength: "Products",
  },
  {
    id: "ownership",
    tab: "Ownership",
    heading: "Take ownership of getting things done",
    description:
      "Univens stays your single accountable execution partner from strategy through delivery—keeping momentum high without adding daily management overhead.",
    actionLabel: "Start with Univens",
    strength: "Systems",
  },
] as const;

const INTENT_CYCLE_DURATION_MS = 20000;

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBrief,
}) => {
  const isVerticalViewport = useIsVerticalViewport();
  const [activeStrength, setActiveStrength] = useState(CORE_STRENGTHS[0].id);
  const [activeIntentIndex, setActiveIntentIndex] = useState(0);
  const valuePropCardRef = useRef<HTMLDivElement | null>(null);
  const isValuePropInView = useInView(valuePropCardRef, { amount: 0.25 });
  const intentTimerProgress = useMotionValue(0);
  const intentProgressWidth = useTransform(
    intentTimerProgress,
    (v) => `${Math.min(100, Math.max(0, v * 100))}%`
  );
  const intentElapsedRef = useRef(0);
  const [{ activeSlide, prevSlide }, setSlideState] = useState<{
    activeSlide: number;
    prevSlide: number | null;
  }>({ activeSlide: 0, prevSlide: null });

  const activeIntent = VALUE_PROP_INTENTS[activeIntentIndex];

  useEffect(() => {
    if (!isValuePropInView) {
      intentElapsedRef.current = 0;
      intentTimerProgress.set(0);
      return;
    }

    intentElapsedRef.current = 0;
    intentTimerProgress.set(0);
    let lastFrameTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const delta = Math.min(Math.max(0, now - lastFrameTime), 100);
      lastFrameTime = now;
      intentElapsedRef.current += delta;

      if (intentElapsedRef.current >= INTENT_CYCLE_DURATION_MS) {
        intentElapsedRef.current = 0;
        intentTimerProgress.set(0);
        setActiveIntentIndex(
          (prev) => (prev + 1) % VALUE_PROP_INTENTS.length
        );
      } else {
        intentTimerProgress.set(
          intentElapsedRef.current / INTENT_CYCLE_DURATION_MS
        );
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [isValuePropInView, intentTimerProgress]);

  const handleSelectIntent = (index: number) => {
    intentElapsedRef.current = 0;
    intentTimerProgress.set(0);
    setActiveIntentIndex(index);
  };

  const visibleSlides = useMemo(
    () =>
      HERO_SLIDES.filter((slide) => {
        const media = isVerticalViewport ? slide.mobile : slide.desktop;
        return Boolean(media && !media.hidden);
      }),
    [isVerticalViewport]
  );

  useEffect(() => {
    setSlideState({ activeSlide: 0, prevSlide: null });
    if (visibleSlides.length <= 1) return;
    const timer = window.setInterval(() => {
      setSlideState((prev) => ({
        activeSlide: (prev.activeSlide + 1) % visibleSlides.length,
        prevSlide: prev.activeSlide,
      }));
    }, 7500);
    return () => window.clearInterval(timer);
  }, [visibleSlides.length]);

  const safeActiveSlide =
    visibleSlides.length > 0 ? activeSlide % visibleSlides.length : 0;
  const safePrevSlide =
    prevSlide !== null && prevSlide < visibleSlides.length ? prevSlide : null;

  return (
    <div className="w-full">
      {/* 1. HERO SECTION — Full-Bleed 100dvh Edge-to-Edge Canvas */}
      <section
        data-hero-section
        className="hero-viewport relative flex w-full flex-col justify-end overflow-hidden bg-[#202823]"
      >
        <div className="relative flex min-h-0 flex-1 w-full flex-col justify-end overflow-hidden">
          {/* Continuous Lap-Dissolve Slideshow with Orientation-Aware Authentic Photography */}
          <div aria-hidden="true" className="absolute inset-0 z-0">
            {visibleSlides.map((slide, idx) => {
              const isActive = idx === safeActiveSlide;
              const isPrev = idx === safePrevSlide;
              const isVisible = isActive || isPrev;
              const media = isVerticalViewport ? slide.mobile! : slide.desktop!;

              return (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: idx === 0 ? 1 : 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{
                    duration: isActive ? 2.6 : 0,
                    ease: [0.37, 0, 0.25, 1],
                  }}
                  className={cn(
                    "absolute inset-0 transform-gpu overflow-hidden will-change-[opacity]",
                    isActive ? "z-[2]" : isPrev ? "z-[1]" : "z-0"
                  )}
                >
                  <img
                    key={media.src}
                    src={media.src}
                    alt={media.alt}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className={cn(
                      "h-full w-full object-cover",
                      media.positionClass
                    )}
                  />
                </motion.div>
              );
            })}

            {/* Whisper-light 35mm grain & localized scrim strictly behind typography */}
            <div className="hero-documentary-grain pointer-events-none absolute inset-0 z-[3]" />
            <div className="hero-portra-scrim pointer-events-none absolute inset-0 z-[3]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-20 bg-gradient-to-b from-black/38 via-black/10 to-transparent" />
          </div>

          {/* Bottom-Left Editorial Content */}
          <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 pt-16 pb-4 sm:px-8 sm:pt-24 sm:pb-8 lg:px-10 lg:pb-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl text-left"
            >
              <h1 className="mb-4 font-sans text-[30px] font-medium leading-[1.42] tracking-[0.03em] [word-spacing:0.06em] text-white/95 sm:mb-6 sm:text-[44px] sm:leading-[1.4] lg:mb-7 lg:text-[52px] lg:leading-[1.38]">
                Global ambition, Indian capabilities
              </h1>

              <p className="mt-2.5 max-w-xl text-[13.5px] leading-relaxed text-white/85 sm:mt-4 sm:text-base lg:text-lg">
                Connect with India&apos;s talent, business ecosystem and
                opportunities to turn business priorities into accountable
                execution.
              </p>

              {/* Primary Action Button */}
              <div className="mt-4 flex flex-row items-center justify-start sm:mt-7">
                <button
                  type="button"
                  onClick={() => onOpenBrief("brief")}
                  className="inline-flex h-10 items-center justify-center rounded-[4px] bg-white px-4 text-xs font-semibold text-[#15293A] whitespace-nowrap shadow-sm transition-all duration-150 hover:bg-[#FFF9EB] active:scale-[0.99] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFBB40] sm:h-11 sm:px-6 sm:text-sm"
                >
                  Explore Possibilities
                </button>
              </div>
            </motion.div>

            {/* Integrated Bottom-Left Client Dummy Logos Strip */}
            <div className="mt-4 border-t border-white/15 pt-3.5 sm:mt-8 sm:pt-5">
              <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2.5 sm:gap-x-10 sm:gap-y-3 lg:gap-x-12">
                {/* Logo 1 */}
                <div className="inline-flex items-center gap-2 text-white/80 select-none">
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
                <div className="inline-flex items-center gap-2 text-white/80 select-none">
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
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION — Mobile-First Editorial Scroll Reveal */}
      <IntroSection />

      {/* 3. VALUE PROPOSITION — Clean White Card over Serene Sky-to-Sunflower Atmospheric Gradient */}
      <section
        id="how-we-work"
        className="horizon-gradient-surface section-viewport relative flex items-center justify-center overflow-hidden px-4 pt-[calc(var(--navbar-height,56px)+0.75rem)] pb-6 sm:px-10 sm:pt-[calc(var(--navbar-height,72px)+0.75rem)] sm:pb-[calc(var(--navbar-height,72px)+0.75rem)] lg:px-16"
      >
        <motion.div
          ref={valuePropCardRef}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex min-h-[min(660px,calc(100dvh-var(--navbar-height,56px)-2.25rem))] w-full max-w-[1160px] flex-col justify-between overflow-hidden rounded-[6px] border border-white/85 bg-white px-6 py-8 text-[#15293A] shadow-[0_24px_64px_-20px_rgba(21,41,58,0.16)] sm:min-h-[min(540px,calc(100dvh-var(--navbar-height,72px)-4.5rem))] sm:p-11 lg:min-h-[min(600px,calc(100dvh-var(--navbar-height,72px)-4.5rem))] lg:p-14"
        >
          {/* Top-Left Display Statement */}
          <div className="max-w-[310px] sm:max-w-[560px] lg:max-w-[700px]">
            <h2 className="font-sans text-[23px] font-normal leading-[1.36] tracking-[-0.005em] [word-spacing:0.02em] text-[#15293A] sm:text-[30px] sm:leading-[1.32] lg:text-[36px] lg:leading-[1.3]">
              CXOs like Sharad, Shahana and Harsh approach us with specific
              business requirements across different domains.
            </h2>
          </div>

          {/* Bottom-Left Descriptive Intent Switcher */}
          <div className="mt-10 w-full max-w-[330px] sm:mt-14 sm:max-w-[520px] lg:mt-16 lg:max-w-[560px]">
            <div className="relative">
              <div
                role="tablist"
                aria-label="How Univens partners with leaders"
                className="flex items-center justify-between sm:justify-start sm:gap-5"
              >
                {VALUE_PROP_INTENTS.map((intent, idx) => {
                  const isActive = idx === activeIntentIndex;
                  return (
                    <button
                      key={intent.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectIntent(idx)}
                      className={cn(
                        "relative min-h-[40px] px-2 pb-2.5 pt-2 font-sans text-[12.5px] tracking-[0.01em] whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#135126] sm:px-3 sm:text-[13.5px]",
                        isActive
                          ? "font-medium text-[#15293A]"
                          : "font-normal text-[#334A5C] hover:text-[#15293A]"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="valuePropActiveTabBg"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 34,
                          }}
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-t-[4px] bg-[#15293A]/[0.055]"
                        />
                      )}
                      <span className="relative z-10">{intent.tab}</span>
                    </button>
                  );
                })}
              </div>

              {/* Complete Full-Width Futuristic Timer Rail (Left -> Right Active Line) */}
              <div
                aria-hidden="true"
                className="relative h-[1px] w-full overflow-hidden bg-[#15293A]/15"
              >
                <motion.span
                  key={activeIntent.id}
                  initial={{ opacity: 0.35 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: intentProgressWidth }}
                  className="relative block h-full overflow-hidden bg-[#135126]"
                >
                  <span className="pointer-events-none absolute inset-y-0 right-0 w-[3px] bg-[#2BB65C]" />
                </motion.span>
              </div>
            </div>

            <div className="min-h-[144px] pt-5 sm:min-h-[122px] sm:pt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIntent.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-sans text-[15px] font-medium leading-snug text-[#15293A] sm:text-[17px]">
                    {activeIntent.heading}
                  </p>
                  <p className="mt-2 font-sans text-[13px] font-normal leading-[1.58] tracking-[0.005em] text-[#284054] sm:text-[14.5px]">
                    {activeIntent.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenBrief("brief", activeIntent.strength)}
                    className="group mt-3.5 inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium text-[#135126] transition-colors duration-150 hover:text-[#15293A] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#135126] sm:text-[13.5px]"
                  >
                    <span>{activeIntent.actionLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. OUR CORE STRENGTHS — Full-Viewport Open Editorial Capability Spread */}
      <section
        id="core-strengths"
        className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-white pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]"
      >
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-[#135126]">
                Our Core Strengths
              </p>
              <h2 className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-3xl lg:text-[36px]">
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
            className="mt-7 lg:mt-8"
          >
            <TabsList className="h-auto w-full flex-wrap justify-start gap-x-8 gap-y-2 rounded-none border-b border-[#D0CDD3]/80 bg-transparent p-0">
              {CORE_STRENGTHS.map((pillar) => (
                <TabsTrigger
                  key={pillar.id}
                  value={pillar.id}
                  className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-1 font-display text-sm sm:text-base text-[#284054] hover:text-[#15293A] data-[state=active]:border-[#135126] data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-[#135126] data-[state=active]:shadow-none"
                >
                  <span className="mr-1.5 text-xs opacity-70 tabular-nums">
                    {pillar.index}.
                  </span>
                  {pillar.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {CORE_STRENGTHS.map((pillar) => (
              <TabsContent key={pillar.id} value={pillar.id} className="mt-7 lg:mt-8">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
                  <div className="lg:col-span-5 space-y-4">
                    <p className="text-xs font-medium text-[#135126] tabular-nums">
                      {pillar.index} · Typical Horizon: {pillar.engagementWindow}
                    </p>
                    <h3 className="font-display text-2xl font-bold leading-tight text-[#15293A] sm:text-3xl">
                      {pillar.tagline}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed text-[#284054]">
                      {pillar.description}
                    </p>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onOpenBrief("brief", pillar.name)}
                        className="inline-flex h-10 items-center gap-3 rounded-[4px] bg-[#135126] pl-4 pr-2 text-sm font-medium text-white transition-colors hover:bg-[#0e3f1d] cursor-pointer"
                      >
                        <span>Scope {pillar.name} with Univens</span>
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-[2px] bg-[#FFBB40] text-[#15293A]">
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 lg:col-start-7 space-y-5">
                    <div>
                      <h4 className="mb-2.5 font-display text-sm font-semibold text-[#15293A]">
                        Core Deliverables Under {pillar.name}
                      </h4>
                      <ul className="grid gap-x-8 border-t border-[#D0CDD3]/80 sm:grid-cols-2">
                        {pillar.deliverables.map((deliv) => (
                          <li
                            key={deliv}
                            className="flex items-center gap-2.5 border-b border-[#D0CDD3]/50 py-2.5 text-sm text-[#15293A]"
                          >
                            <Check className="h-4 w-4 shrink-0 text-[#135126]" />
                            <span>{deliv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-[6px] border border-[#D0CDD3]/70 bg-[#F2F7F9]/85 p-4 sm:p-5">
                      <p className="text-xs font-medium text-[#284054]">
                        Expected Business Outcome
                      </p>
                      <p className="mt-1 font-display text-base sm:text-lg font-semibold leading-snug text-[#15293A]">
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

      {/* 5. POSSIBILITIES — Clear Daytime Sky Mist Blueprint Grid */}
      <section className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#EDF5FA] pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-[#135126]">
                Possibilities &amp; Blueprints
              </p>
              <h2 className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-3xl lg:text-[36px]">
                Planning-to-impact flows for practical execution.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#284054]">
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

          <div className="mt-7 grid gap-x-10 gap-y-6 md:grid-cols-2 lg:mt-9 lg:gap-x-14 lg:gap-y-7">
            {POSSIBILITIES_BLUEPRINTS.slice(0, 4).map((bp) => (
              <article
                key={bp.slug}
                className="group flex flex-col justify-between border-t border-[#15293A]/15 pt-4 sm:pt-5"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#284054] tabular-nums">
                    <span className="font-medium text-[#135126]">
                      {bp.published}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{bp.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{bp.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-semibold leading-snug text-[#15293A] transition-colors group-hover:text-[#135126] line-clamp-2">
                    {bp.title}
                  </h3>
                  <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-[#284054] line-clamp-2">
                    {bp.summary}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-1">
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
      <section className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-white pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-sm font-medium text-[#135126]">
                Proven Execution
              </p>
              <h2 className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-3xl lg:text-[36px]">
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

          {/* Case Study Columns with Center Forest Green + Sunflower Gold Anchor */}
          <div className="mt-7 grid gap-5 lg:mt-9 lg:grid-cols-3 lg:gap-6">
            {CASE_STUDIES.map((cs, index) => {
              const isFeatured = index === 1;
              return (
                <Card
                  key={cs.id}
                  className={cn(
                    "flex flex-col justify-between p-1",
                    isFeatured
                      ? "border-[#135126] bg-[#135126] text-white"
                      : "bg-[#FAFBF7] text-[#15293A]"
                  )}
                >
                  <CardHeader className="space-y-2.5 p-5 pb-3">
                    <div
                      className={cn(
                        "text-xs",
                        isFeatured ? "text-[#DEEFE4]" : "text-[#284054]"
                      )}
                    >
                      <span>{cs.client}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{cs.sector}</span>
                    </div>
                    <div
                      className={cn(
                        "border-b pb-3.5",
                        isFeatured
                          ? "border-white/20"
                          : "border-[#D0CDD3]/80"
                      )}
                    >
                      <p
                        className={cn(
                          "font-display text-3xl font-bold tabular-nums",
                          isFeatured ? "text-[#FFBB40]" : "text-[#135126]"
                        )}
                      >
                        {cs.outcomeMetric}
                      </p>
                      <p
                        className={cn(
                          "mt-1 text-xs",
                          isFeatured ? "text-[#DEEFE4]" : "text-[#284054]"
                        )}
                      >
                        {cs.outcomeContext}
                      </p>
                    </div>
                    <CardTitle
                      className={cn(
                        "text-lg leading-snug pt-1",
                        isFeatured ? "text-white" : "text-[#15293A]"
                      )}
                    >
                      {cs.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 p-5 pt-1">
                    <p
                      className={cn(
                        "text-xs sm:text-sm leading-relaxed line-clamp-3",
                        isFeatured ? "text-white/90" : "text-[#284054]"
                      )}
                    >
                      {cs.execution}
                    </p>
                    <div
                      className={cn(
                        "grid grid-cols-3 gap-3 border-t pt-3.5",
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
                              isFeatured ? "text-[#DEEFE4]" : "text-[#284054]"
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
      <section className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-medium text-[#135126]">
              Executive Testimonials
            </p>
            <h2 className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-3xl lg:text-[36px]">
              Perspectives from leaders we work alongside.
            </h2>
          </div>

          <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-3 lg:gap-12">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="flex flex-col justify-between border-t border-[#D0CDD3] pt-5"
              >
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#135126]">
                    {t.context}
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-[#15293A]">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <footer className="mt-6 border-t border-[#D0CDD3]/60 pt-4">
                  <p className="font-display text-sm font-semibold text-[#15293A]">
                    {t.author}
                  </p>
                  <p className="mt-0.5 text-xs text-[#284054]">
                    {t.role}, {t.company}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WORD FROM DIRECTOR & PLATFORMS / EVENTS — Full-Viewport Editorial Split */}
      <section className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-white pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <GeometricFrame accentColor="#FFBB40" className="p-1.5">
                <div className="rounded-[6px] border border-[#D0CDD3]/80 bg-[#FAFBF7] p-6 sm:p-8 lg:p-9 space-y-4">
                  <div className="flex items-center justify-between gap-4 border-b border-[#D0CDD3]/70 pb-4">
                    <p className="text-xs font-medium text-[#135126]">
                      Word from the Director
                    </p>
                    <UnivensLogo variant="mark" surface="light" className="h-6 w-7 opacity-85" />
                  </div>
                  <blockquote className="font-display text-xl font-semibold leading-[1.32] text-[#15293A] sm:text-2xl lg:text-[26px]">
                    &ldquo;Clarity comes first. Complexity comes later. Trust is
                    built through consistent action.&rdquo;
                  </blockquote>
                  <p className="max-w-2xl text-sm leading-relaxed text-[#284054] sm:text-base">
                    Decision-makers carry enough noise in their daily calendars.
                    We built Univens as a dependable partner—so you can bring a
                    business ambition to the table and rely on thoughtful,
                    accountable execution from day one.
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D0CDD3]/70 pt-4">
                    <div>
                      <p className="font-display text-sm font-semibold text-[#15293A]">
                        Leadership Desk, Univens
                      </p>
                      <p className="text-xs text-[#284054]">
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
              </GeometricFrame>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <p className="text-sm font-medium text-[#135126]">
                  Platforms &amp; Executive Events
                </p>
                <h3 className="font-display text-2xl font-bold text-[#15293A] sm:text-[28px]">
                  Stay connected to India&apos;s ecosystem
                </h3>
              </div>
              <div className="divide-y divide-[#D0CDD3]/70 border-y border-[#D0CDD3]/70">
                {PLATFORMS_AND_EVENTS.map((item) => (
                  <div key={item.title} className="py-4">
                    <div className="flex items-center justify-between text-xs text-[#284054]">
                      <span className="font-medium text-[#135126]">
                        {item.type}
                      </span>
                      <span>{item.schedule}</span>
                    </div>
                    <h4 className="mt-1 font-display text-base font-semibold text-[#15293A]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#284054]">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS — Airy Sky Mist Spacious Q&A */}
      <section className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#EDF5FA] pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="lg:col-span-4 space-y-3">
              <p className="text-sm font-medium text-[#135126]">FAQ</p>
              <h2 className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-3xl lg:text-[36px]">
                Frequently asked questions
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#284054]">
                Clear answers on how Univens partners with businesses, global
                leaders, and commercial partners.
              </p>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <Accordion type="single" collapsible className="w-full">
                {FAQS.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="py-3 text-sm sm:text-[15px]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3.5 text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CONVERSION BAND — Sunlit Sky, Meadow Sage & Glass Selector */}
      <section className="section-viewport relative flex flex-col justify-center overflow-hidden sage-mist-band pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 fluted-glass-overlay opacity-50"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-5 space-y-4">
              <GeometricFrame
                accentColor="#FFBB40"
                className="inline-block rounded-[4px] bg-white/85 backdrop-blur-sm px-3 py-2"
              >
                <p className="text-xs font-medium text-[#135126]">
                  Your Next Step
                </p>
              </GeometricFrame>
              <h2 className="font-display text-2xl font-bold leading-[1.12] tracking-tight text-[#15293A] sm:text-3xl lg:text-[36px]">
                Register to stay updated with opportunities of your interest.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[#284054]">
                Whether you have an immediate execution priority or want curated
                updates on relevant India technology and commercial openings,
                share your context here.
              </p>
              <ul className="space-y-2.5 pt-2 text-sm text-[#15293A]">
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
