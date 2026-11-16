import React, { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { CORE_STRENGTHS, PageRoute } from "../data/univensData";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

interface OfferingsPageProps {
  selectedStrengthId?: string | null;
  onSelectStrength?: (id: string) => void;
  onNavigate: (page: PageRoute) => void;
  onOpenBrief: (
    defaultMode?: "brief" | "opportunities",
    strength?: string
  ) => void;
}

export const OfferingsPage: React.FC<OfferingsPageProps> = ({
  selectedStrengthId,
  onSelectStrength,
  onNavigate,
  onOpenBrief,
}) => {
  const isValidStrength =
    !!selectedStrengthId &&
    CORE_STRENGTHS.some((s) => s.id === selectedStrengthId);
  const [selectedFilter, setSelectedFilter] = useState<string>(
    isValidStrength && selectedStrengthId ? selectedStrengthId : "all"
  );

  useEffect(() => {
    if (
      selectedStrengthId &&
      CORE_STRENGTHS.some((s) => s.id === selectedStrengthId)
    ) {
      setSelectedFilter(selectedStrengthId);
    } else if (!selectedStrengthId) {
      setSelectedFilter("all");
    }
  }, [selectedStrengthId]);

  const handleFilterChange = (next: string) => {
    setSelectedFilter(next);
    onSelectStrength?.(next);
  };

  const visibleStrengths =
    selectedFilter === "all"
      ? CORE_STRENGTHS
      : CORE_STRENGTHS.filter((s) => s.id === selectedFilter);

  return (
    <div className="w-full">
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-[#D0CDD3]/80 sage-mist-band py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 fluted-glass-overlay opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-medium text-[#135126]">Offerings</p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#15293A] sm:text-5xl lg:text-[52px]">
              Six core strengths engineered for business execution.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#555555]">
              We don&apos;t force your business into a pre-packaged agency tier.
              We start with your priority, define clear deliverables, and bring
              together the exact capabilities required.
            </p>
          </div>

          {/* Interactive Pillar Filter */}
          <div className="mt-10 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleFilterChange("all")}
              className={cn(
                "rounded-[4px] border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                selectedFilter === "all"
                  ? "border-[#135126] bg-[#135126] text-white"
                  : "border-[#D0CDD3] bg-white/80 backdrop-blur-sm text-[#555555] hover:text-[#15293A]"
              )}
            >
              All 6 Capabilities
            </button>
            {CORE_STRENGTHS.map((pillar) => (
              <button
                key={pillar.id}
                type="button"
                onClick={() => handleFilterChange(pillar.id)}
                className={cn(
                  "rounded-[4px] border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  selectedFilter === pillar.id
                    ? "border-[#135126] bg-[#135126] text-white"
                    : "border-[#D0CDD3] bg-white/80 backdrop-blur-sm text-[#555555] hover:text-[#15293A]"
                )}
              >
                <span className="mr-1.5 text-xs opacity-75 tabular-nums">
                  {pillar.index}.
                </span>
                {pillar.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6 space-y-12">
          {visibleStrengths.map((pillar, idx) => {
            const isHighlighted = idx % 3 === 1;
            return (
              <article
                key={pillar.id}
                className={cn(
                  "rounded-[6px] border p-8 sm:p-10 lg:p-12",
                  isHighlighted
                    ? "border-[#135126] bg-[#135126] text-white"
                    : "border-[#D0CDD3] sage-mist-band text-[#15293A]"
                )}
              >
                <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
                  <div className="lg:col-span-5 space-y-5">
                    <div
                      className={cn(
                        "flex items-center gap-2 text-xs font-medium tabular-nums",
                        isHighlighted ? "text-[#FFBB40]" : "text-[#135126]"
                      )}
                    >
                      <span>{pillar.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>{pillar.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>{pillar.engagementWindow}</span>
                    </div>
                    <h2
                      className={cn(
                        "font-display text-2xl font-bold leading-snug sm:text-3xl",
                        isHighlighted ? "text-white" : "text-[#15293A]"
                      )}
                    >
                      {pillar.tagline}
                    </h2>
                    <p
                      className={cn(
                        "text-sm leading-relaxed sm:text-base",
                        isHighlighted ? "text-[#DEEFE4]" : "text-[#555555]"
                      )}
                    >
                      {pillar.description}
                    </p>
                    <div className="pt-4 flex flex-wrap gap-3">
                      <Button
                        size="sm"
                        variant={isHighlighted ? "glass" : "default"}
                        className={
                          isHighlighted
                            ? "bg-white text-[#15293A] hover:bg-[#FAFBF7]"
                            : undefined
                        }
                        onClick={() => onOpenBrief("brief", pillar.name)}
                      >
                        Scope {pillar.name}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={
                          isHighlighted
                            ? "border-white/30 bg-transparent text-white hover:bg-white/10"
                            : undefined
                        }
                        onClick={() => onNavigate("case-studies")}
                      >
                        Related Proof
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-between space-y-8">
                    <div>
                      <h3
                        className={cn(
                          "font-display text-sm font-semibold",
                          isHighlighted ? "text-white" : "text-[#15293A]"
                        )}
                      >
                        Included Capabilities &amp; Deliverables
                      </h3>
                      <Separator
                        className={cn(
                          "my-4",
                          isHighlighted ? "bg-white/20" : undefined
                        )}
                      />
                      <ul className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                        {pillar.deliverables.map((item) => (
                          <li
                            key={item}
                            className={cn(
                              "flex items-center gap-3 border-b py-3.5 text-sm",
                              isHighlighted
                                ? "border-white/15"
                                : "border-[#D0CDD3]/50"
                            )}
                          >
                            <Check
                              className={cn(
                                "h-4 w-4 shrink-0",
                                isHighlighted
                                  ? "text-[#FFBB40]"
                                  : "text-[#135126]"
                              )}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className={cn(
                        "border-t pt-5",
                        isHighlighted
                          ? "border-white/20"
                          : "border-[#D0CDD3]/70"
                      )}
                    >
                      <p
                        className={cn(
                          "text-xs",
                          isHighlighted ? "text-[#DEEFE4]" : "text-[#555555]"
                        )}
                      >
                        Target Outcome:{" "}
                        <span
                          className={cn(
                            "font-medium",
                            isHighlighted ? "text-white" : "text-[#15293A]"
                          )}
                        >
                          {pillar.outcome}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
