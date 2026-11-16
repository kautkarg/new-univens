import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  CASE_STUDIES,
  IMAGES,
  PageRoute,
  TESTIMONIALS,
} from "../data/univensData";
import { cn } from "../lib/utils";
import { ResilientImage } from "../components/ResilientImage";
import { GeometricFrame } from "../components/UnivensLogo";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

interface CaseStudiesPageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBrief: (
    defaultMode?: "brief" | "opportunities",
    strength?: string
  ) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({
  onOpenBrief,
}) => {
  const [domainFilter, setDomainFilter] = useState<string>("all");

  const domains = [
    { id: "all", label: "All Case Studies" },
    { id: "systems", label: "Systems & Automation" },
    { id: "products", label: "Digital Products" },
    { id: "presence", label: "Presence & Demand" },
  ];

  const visibleStudies =
    domainFilter === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.strengthId === domainFilter);

  return (
    <div className="w-full">
      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-[#FAFBF7] py-20 lg:py-28">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-sm font-medium text-[#135126]">Case Studies</p>
              <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#15293A] sm:text-5xl lg:text-[52px]">
                Accountable execution measured in real business outcomes.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[#555555]">
                See how Univens works alongside founders, managing directors, and
                commercial partners to turn operational bottlenecks and product
                priorities into completed work.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-4">
                {domains.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDomainFilter(d.id)}
                    className={cn(
                      "rounded-[4px] border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                      domainFilter === d.id
                        ? "border-[#135126] bg-[#135126] text-white"
                        : "border-[#D0CDD3] bg-white text-[#555555] hover:text-[#15293A]"
                    )}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <GeometricFrame className="p-2.5">
                <ResilientImage
                  src={IMAGES.architectureHub}
                  alt="Modern sunlit technology hub courtyard in India conveying operational scale and calm precision"
                  aspectClassName="aspect-[4/3] w-full"
                  fallbackTitle="India Execution Ecosystem"
                />
              </GeometricFrame>
            </div>
          </div>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center border-b border-[#D0CDD3]/80 bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6 space-y-12">
          {visibleStudies.map((cs, idx) => {
            const isHighlighted = idx === 1;
            return (
              <article
                key={cs.id}
                className={cn(
                  "rounded-[6px] border p-8 sm:p-10 lg:p-12",
                  isHighlighted
                    ? "border-[#135126] bg-[#135126] text-white"
                    : "border-[#D0CDD3] sage-mist-band text-[#15293A]"
                )}
              >
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                  <div className="lg:col-span-4 space-y-6">
                    <div
                      className={cn(
                        "text-xs",
                        isHighlighted ? "text-[#DEEFE4]" : "text-[#555555]"
                      )}
                    >
                      <span
                        className={cn(
                          "font-medium",
                          isHighlighted ? "text-[#FFBB40]" : "text-[#135126]"
                        )}
                      >
                        {cs.client}
                      </span>
                      <span aria-hidden="true"> · </span>
                      <span>{cs.sector}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{cs.location}</span>
                    </div>
                    <div
                      className={cn(
                        "border-b pb-6",
                        isHighlighted
                          ? "border-white/20"
                          : "border-[#D0CDD3]/80"
                      )}
                    >
                      <p
                        className={cn(
                          "font-display text-4xl font-bold tabular-nums",
                          isHighlighted ? "text-[#FFBB40]" : "text-[#135126]"
                        )}
                      >
                        {cs.outcomeMetric}
                      </p>
                      <p
                        className={cn(
                          "mt-2 text-xs",
                          isHighlighted ? "text-[#DEEFE4]" : "text-[#555555]"
                        )}
                      >
                        {cs.outcomeContext}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-1">
                      {cs.secondaryMetrics.map((m) => (
                        <div key={m.label}>
                          <p
                            className={cn(
                              "font-display text-base font-bold tabular-nums",
                              isHighlighted ? "text-white" : "text-[#15293A]"
                            )}
                          >
                            {m.value}
                          </p>
                          <p
                            className={cn(
                              "mt-0.5 text-[11px]",
                              isHighlighted ? "text-[#DEEFE4]" : "text-[#555555]"
                            )}
                          >
                            {m.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-8 flex flex-col justify-between space-y-8">
                    <div className="space-y-6">
                      <h2
                        className={cn(
                          "font-display text-2xl font-bold leading-snug sm:text-3xl",
                          isHighlighted ? "text-white" : "text-[#15293A]"
                        )}
                      >
                        {cs.title}
                      </h2>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <div
                          className={cn(
                            "border-t pt-5 space-y-2",
                            isHighlighted
                              ? "border-white/20"
                              : "border-[#D0CDD3]/80"
                          )}
                        >
                          <p
                            className={cn(
                              "text-xs font-semibold",
                              isHighlighted ? "text-[#FFBB40]" : "text-[#15293A]"
                            )}
                          >
                            Business Challenge
                          </p>
                          <p
                            className={cn(
                              "text-sm leading-relaxed",
                              isHighlighted ? "text-[#DEEFE4]" : "text-[#555555]"
                            )}
                          >
                            {cs.challenge}
                          </p>
                        </div>
                        <div
                          className={cn(
                            "border-t pt-5 space-y-2",
                            isHighlighted
                              ? "border-white/20"
                              : "border-[#D0CDD3]/80"
                          )}
                        >
                          <p
                            className={cn(
                              "text-xs font-semibold",
                              isHighlighted ? "text-[#FFBB40]" : "text-[#135126]"
                            )}
                          >
                            Univens Execution
                          </p>
                          <p
                            className={cn(
                              "text-sm leading-relaxed",
                              isHighlighted ? "text-[#DEEFE4]" : "text-[#555555]"
                            )}
                          >
                            {cs.execution}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator
                      className={isHighlighted ? "bg-white/20" : undefined}
                    />
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span
                        className={cn(
                          "text-xs",
                          isHighlighted ? "text-[#DEEFE4]" : "text-[#555555]"
                        )}
                      >
                        Interested in a comparable outcome?
                      </span>
                      <Button
                        size="sm"
                        className={
                          isHighlighted
                            ? "bg-white text-[#15293A] hover:bg-[#FAFBF7]"
                            : undefined
                        }
                        onClick={() =>
                          onOpenBrief(
                            "brief",
                            cs.strengthId.charAt(0).toUpperCase() +
                              cs.strengthId.slice(1)
                          )
                        }
                      >
                        Discuss a Similar Requirement
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Executive Testimonials */}
      <section className="flex min-h-screen flex-col justify-center bg-[#FAFBF7] py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium text-[#135126]">
              Executive Testimonials
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-[#15293A] sm:text-4xl">
              In the words of Sharad, Shahana, and Harsh
            </h2>
          </div>

          <div className="mt-14 grid gap-12 lg:mt-16 lg:grid-cols-3 lg:gap-14">
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
                <footer className="mt-10 border-t border-[#D0CDD3]/70 pt-5">
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
    </div>
  );
};
