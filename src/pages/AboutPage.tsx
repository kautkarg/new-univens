import React from "react";
import { ArrowRight } from "lucide-react";
import {
  IMAGES,
  OPERATING_PRINCIPLES,
  PageRoute,
  WHAT_WE_ARE_NOT,
} from "../data/univensData";
import { ResilientImage } from "../components/ResilientImage";
import { GeometricFrame, UnivensLogo } from "../components/UnivensLogo";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBrief: (defaultMode?: "brief" | "opportunities") => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenBrief,
}) => {
  return (
    <div className="w-full">
      {/* Page Header */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm font-medium text-[#135126]">About Univens</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#15293A] sm:text-5xl lg:text-[52px]">
                A dependable execution partner built for clarity.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#555555]">
                Univens connects business opportunities with the capabilities
                required to pursue them. We help businesses access specialist
                expertise, execute technology-led initiatives and move forward
                without having to build every capability in-house.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Button onClick={() => onOpenBrief("brief")}>
                  Start a Conversation
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onNavigate("offerings")}
                >
                  Explore Capabilities
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <GeometricFrame className="p-2.5">
                <ResilientImage
                  src={IMAGES.founderWorkspace}
                  alt="Business leaders discussing strategic execution at a timber table surrounded by natural greenery"
                  aspectClassName="aspect-[4/3] w-full"
                  fallbackTitle="Strategic Partnership · Univens"
                />
              </GeometricFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning & What We Are Not */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-4 space-y-5">
              <p className="text-sm font-medium text-[#135126]">
                Our Positioning
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight text-[#15293A] sm:text-4xl">
                Practical. Connected. Accountable.
              </h2>
              <p className="text-base leading-relaxed text-[#555555]">
                Our role is to connect business priorities, specialist
                capability and execution through a single dependable
                partnership.
              </p>
              <div className="pt-6">
                <UnivensLogo variant="horizontal" surface="light" />
              </div>
            </div>

            <div className="lg:col-span-7 lg:col-start-6 space-y-8">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#15293A]">
                  What Univens Is Not
                </h3>
                <p className="mt-2 text-base text-[#555555]">
                  Clarity comes from knowing both what we stand for and what we
                  deliberately avoid.
                </p>
              </div>
              <Separator />
              <div className="grid gap-10 pt-2 md:grid-cols-3">
                {WHAT_WE_ARE_NOT.map((item) => (
                  <div key={item.index} className="space-y-3">
                    <p className="font-display text-xs font-bold text-[#135126] tabular-nums">
                      {item.index}
                    </p>
                    <h4 className="font-display text-lg font-semibold text-[#15293A]">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-[#555555]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal Customer Profile Comparison */}
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-medium text-[#135126]">Who We Serve</p>
            <h2 className="font-display text-3xl font-bold leading-[1.15] text-[#15293A] sm:text-4xl">
              Designed for busy decision-makers and commercial partners.
            </h2>
          </div>

          <div className="mt-14 overflow-hidden rounded-[6px] border border-[#D0CDD3] bg-white lg:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#D0CDD3] bg-[#15293A] text-white">
              <div className="p-5 sm:p-7 font-display text-sm font-semibold">
                Attribute
              </div>
              <div className="p-5 sm:p-7 font-display text-sm font-semibold border-t border-white/10 md:border-t-0 md:border-l">
                Primary ICP (Businesses)
              </div>
              <div className="p-5 sm:p-7 font-display text-sm font-semibold border-t border-white/10 md:border-t-0 md:border-l">
                Secondary ICP (Partners)
              </div>
            </div>

            {[
              {
                attr: "Audience",
                primary:
                  "Founders, CEOs, and CXOs at startups, SMEs, or growth companies needing strategic technology delivery.",
                secondary:
                  "Consultants, agencies, technology vendors, and channel partners needing a reliable tech partner for clients.",
              },
              {
                attr: "Key Needs",
                primary:
                  "Specialist technology expertise, hands-on execution of initiatives, clear ownership, and measurable ROI.",
                secondary:
                  "Engineering and delivery capacity, integration support, and scalable tech solutions for customers.",
              },
              {
                attr: "Decision Drivers",
                primary:
                  "Proven execution track record, strategic business understanding, and end-to-end accountability.",
                secondary:
                  "Trust and reliability, complementary expertise, and a collaborative partnership model.",
              },
            ].map((row, i) => (
              <div
                key={row.attr}
                className={`grid grid-cols-1 md:grid-cols-3 ${
                  i < 2 ? "border-b border-[#D0CDD3]" : ""
                }`}
              >
                <div className="p-5 sm:p-7 font-display text-sm font-semibold text-[#15293A] bg-[#FAFBF7]">
                  {row.attr}
                </div>
                <div className="p-5 sm:p-7 text-sm leading-relaxed text-[#555555] md:border-l md:border-[#D0CDD3]">
                  {row.primary}
                </div>
                <div className="p-5 sm:p-7 text-sm leading-relaxed text-[#555555] md:border-l md:border-[#D0CDD3]">
                  {row.secondary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Principles (Human Potential / मानवसंभावना) */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden sage-mist-band py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 fluted-glass-overlay opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-medium text-[#135126]">
              Purpose &amp; Operating Principles
            </p>
            <h2 className="font-display text-3xl font-bold text-[#15293A] sm:text-4xl">
              मानवसंभावना · Human Potential
            </h2>
            <p className="text-base leading-relaxed text-[#555555]">
              Businesses are environments in which human potential flourishes
              when capable people align around a shared purpose.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {OPERATING_PRINCIPLES.map((p, idx) => {
              const isAnchor = idx === 0 || idx === 4;
              return (
                <div
                  key={p.translation}
                  className={
                    isAnchor
                      ? "flex min-h-[210px] flex-col justify-between rounded-[6px] border border-[#135126] bg-[#135126] p-8 space-y-4 text-white"
                      : "glass-panel flex min-h-[210px] flex-col justify-between rounded-[6px] p-8 space-y-4 text-[#15293A]"
                  }
                >
                  <p
                    className={
                      isAnchor
                        ? "text-sm font-medium text-[#FFBB40] leading-relaxed"
                        : "text-sm font-medium text-[#135126] leading-relaxed"
                    }
                  >
                    {p.sanskrit}
                  </p>
                  <p
                    className={
                      isAnchor
                        ? "text-sm leading-relaxed text-white"
                        : "text-sm leading-relaxed text-[#555555]"
                    }
                  >
                    {p.translation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
