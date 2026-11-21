import React from "react";
import { ArrowRight } from "lucide-react";
import {
  OPERATING_PRINCIPLES,
  PageRoute,
  WHAT_WE_ARE_NOT,
} from "../data/univensData";
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
      <section className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm font-medium text-[#135126]">About Univens</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#15293A] sm:text-5xl lg:text-[52px]">
                A dependable execution partner built for clarity.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#284054]">
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
                <div className="rounded-[6px] border border-[#D0CDD3]/80 bg-white p-8 sm:p-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-[#D0CDD3]/70 pb-5">
                    <div>
                      <p className="text-xs font-medium text-[#135126]">
                        Operating Model
                      </p>
                      <p className="mt-1 font-display text-lg font-semibold text-[#15293A]">
                        Single-Point Execution Architecture
                      </p>
                    </div>
                    <UnivensLogo variant="mark" surface="light" className="h-7 w-8 opacity-85" />
                  </div>
                  <div className="divide-y divide-[#D0CDD3]/70">
                    {[
                      {
                        step: "01",
                        title: "Requirement Clarity First",
                        detail:
                          "Translate executive priorities into explicit deliverables before committing specialist resources.",
                      },
                      {
                        step: "02",
                        title: "Curated Indian Capability",
                        detail:
                          "Assemble vetted engineering, automation, and commercial teams matched precisely to the scope.",
                      },
                      {
                        step: "03",
                        title: "End-to-End Accountability",
                        detail:
                          "One dependable partner owning coordination, milestones, and final business outcomes.",
                      },
                    ].map((pillar) => (
                      <div key={pillar.step} className="flex gap-4 py-4 first:pt-1 last:pb-1">
                        <span className="font-display text-xs font-bold text-[#135126] tabular-nums pt-1">
                          {pillar.step}
                        </span>
                        <div>
                          <h3 className="font-display text-sm font-semibold text-[#15293A]">
                            {pillar.title}
                          </h3>
                          <p className="mt-1 text-xs leading-relaxed text-[#284054]">
                            {pillar.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </GeometricFrame>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning & What We Are Not */}
      <section className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-white pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div className="lg:col-span-4 space-y-5">
              <p className="text-sm font-medium text-[#135126]">
                Our Positioning
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight text-[#15293A] sm:text-4xl">
                Practical. Connected. Accountable.
              </h2>
              <p className="text-base leading-relaxed text-[#284054]">
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
                <p className="mt-2 text-base text-[#284054]">
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
                    <p className="text-sm leading-relaxed text-[#284054]">
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
      <section className="section-viewport flex flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-medium text-[#135126]">Who We Serve</p>
            <h2 className="font-display text-2xl font-bold leading-[1.15] text-[#15293A] sm:text-3xl lg:text-[36px]">
              Designed for busy decision-makers and commercial partners.
            </h2>
          </div>

          <div className="mt-8 overflow-hidden rounded-[6px] border border-[#D0CDD3] bg-white lg:mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#D0CDD3] bg-[#15293A] text-white">
              <div className="p-4 sm:p-5 font-display text-sm font-semibold">
                Attribute
              </div>
              <div className="p-4 sm:p-5 font-display text-sm font-semibold border-t border-white/10 md:border-t-0 md:border-l">
                Primary ICP (Businesses)
              </div>
              <div className="p-4 sm:p-5 font-display text-sm font-semibold border-t border-white/10 md:border-t-0 md:border-l">
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
                <div className="p-4 sm:p-5 font-display text-sm font-semibold text-[#15293A] bg-[#FAFBF7]">
                  {row.attr}
                </div>
                <div className="p-4 sm:p-5 text-sm leading-relaxed text-[#284054] md:border-l md:border-[#D0CDD3]">
                  {row.primary}
                </div>
                <div className="p-4 sm:p-5 text-sm leading-relaxed text-[#284054] md:border-l md:border-[#D0CDD3]">
                  {row.secondary}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating Principles (Human Potential / मानवसंभावना) */}
      <section className="section-viewport relative flex flex-col justify-center overflow-hidden sage-mist-band pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 fluted-glass-overlay opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-sm font-medium text-[#135126]">
              Purpose &amp; Operating Principles
            </p>
            <h2 className="font-display text-2xl font-bold text-[#15293A] sm:text-3xl lg:text-[36px]">
              मानवसंभावना · Human Potential
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#284054]">
              Businesses are environments in which human potential flourishes
              when capable people align around a shared purpose.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-5">
            {OPERATING_PRINCIPLES.map((p, idx) => {
              const isAnchor = idx === 0 || idx === 4;
              return (
                <div
                  key={p.translation}
                  className={
                    isAnchor
                      ? "flex min-h-[156px] flex-col justify-between rounded-[6px] border border-[#135126] bg-[#135126] p-6 space-y-3 text-white"
                      : "glass-panel flex min-h-[156px] flex-col justify-between rounded-[6px] p-6 space-y-3 text-[#15293A]"
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
                        : "text-sm leading-relaxed text-[#284054]"
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
