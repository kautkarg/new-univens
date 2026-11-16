import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { POSSIBILITIES_BLUEPRINTS, PageRoute } from "../data/univensData";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

interface PossibilitiesPageProps {
  selectedSlug?: string | null;
  onSelectSlug: (slug: string | null) => void;
  onNavigate: (page: PageRoute) => void;
  onOpenBrief: (
    defaultMode?: "brief" | "opportunities",
    strength?: string
  ) => void;
}

export const PossibilitiesPage: React.FC<PossibilitiesPageProps> = ({
  selectedSlug,
  onSelectSlug,
  onOpenBrief,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const activeBlueprint = selectedSlug
    ? POSSIBILITIES_BLUEPRINTS.find((b) => b.slug === selectedSlug)
    : null;

  if (activeBlueprint) {
    const otherBlueprints = POSSIBILITIES_BLUEPRINTS.filter(
      (b) => b.slug !== activeBlueprint.slug
    );

    return (
      <section className="flex min-h-screen flex-col justify-center w-full bg-[#FAFBF7] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <button
            type="button"
            onClick={() => onSelectSlug(null)}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#135126] hover:underline cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Blueprints
          </button>

          <article className="mt-10 max-w-4xl rounded-[6px] border border-[#D0CDD3] bg-white p-8 sm:p-12 space-y-10">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#555555] tabular-nums">
                <span className="font-medium text-[#135126]">
                  {activeBlueprint.published}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeBlueprint.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeBlueprint.readTime}</span>
              </div>
              <h1 className="font-display text-3xl font-bold leading-tight text-[#15293A] sm:text-4xl">
                {activeBlueprint.title}
              </h1>
              <p className="text-lg leading-relaxed text-[#555555]">
                {activeBlueprint.summary}
              </p>
            </div>

            {/* Quantified Metrics Strip */}
            <div className="grid grid-cols-1 gap-4 rounded-[6px] border border-[#D0CDD3] bg-[#FAFBF7] p-5 sm:grid-cols-3">
              {activeBlueprint.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-display text-2xl font-bold text-[#135126] tabular-nums">
                    {m.value}
                  </p>
                  <p className="mt-0.5 text-xs text-[#555555]">{m.label}</p>
                </div>
              ))}
            </div>

            <Separator />

            {/* 4-Stage Planning-to-Impact Flow */}
            <div className="space-y-6">
              <div className="rounded-[6px] border border-[#D0CDD3] bg-[#FAFBF7] p-6 space-y-2">
                <p className="text-xs font-semibold text-[#135126] tabular-nums">
                  01. Business Context
                </p>
                <p className="text-base leading-relaxed text-[#15293A]">
                  {activeBlueprint.stages.context}
                </p>
              </div>

              <div className="rounded-[6px] border border-[#D0CDD3] bg-[#FAFBF7] p-6 space-y-2">
                <p className="text-xs font-semibold text-[#135126] tabular-nums">
                  02. Execution Planning & Scope
                </p>
                <p className="text-base leading-relaxed text-[#15293A]">
                  {activeBlueprint.stages.planning}
                </p>
              </div>

              <div className="rounded-[6px] border border-[#D0CDD3] bg-[#FAFBF7] p-6 space-y-3">
                <p className="text-xs font-semibold text-[#135126] tabular-nums">
                  03. Specialist Capabilities Engaged
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-3">
                  {activeBlueprint.stages.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-2 text-sm text-[#15293A]"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#135126]" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[6px] border border-[#135126]/30 bg-[#DEEFE4]/50 p-6 space-y-2">
                <p className="text-xs font-semibold text-[#135126] tabular-nums">
                  04. Measurable Business Impact
                </p>
                <p className="font-display text-lg font-semibold text-[#15293A]">
                  {activeBlueprint.stages.impact}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 border-t border-[#D0CDD3] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-base font-semibold text-[#15293A]">
                  Considering a similar path for your business?
                </p>
                <p className="text-sm text-[#555555]">
                  Share your context and we will outline a tailored blueprint.
                </p>
              </div>
              <Button
                onClick={() =>
                  onOpenBrief("brief", activeBlueprint.relatedStrength)
                }
              >
                Explore This Blueprint
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </article>

          {/* More Blueprints */}
          <div className="mt-16 space-y-6">
            <h2 className="font-display text-xl font-bold text-[#15293A]">
              Further Execution Blueprints
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {otherBlueprints.map((bp) => (
                <Card
                  key={bp.slug}
                  className="bg-white hover:border-[#135126] cursor-pointer p-2"
                  onClick={() => onSelectSlug(bp.slug)}
                >
                  <CardHeader className="space-y-3">
                    <p className="text-xs text-[#135126] font-medium tabular-nums">
                      {bp.published} · {bp.readTime}
                    </p>
                    <CardTitle className="text-base">{bp.title}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categories = [
    "all",
    ...Array.from(new Set(POSSIBILITIES_BLUEPRINTS.map((b) => b.category))),
  ];

  const filtered =
    categoryFilter === "all"
      ? POSSIBILITIES_BLUEPRINTS
      : POSSIBILITIES_BLUEPRINTS.filter((b) => b.category === categoryFilter);

  return (
    <div className="w-full">
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-[#D0CDD3]/80 sage-mist-band py-20 lg:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 fluted-glass-overlay opacity-40"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-medium text-[#135126]">
              Possibilities &amp; Blueprints
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-[#15293A] sm:text-5xl lg:text-[52px]">
              Planning-to-impact blueprints for executive decisions.
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[#555555]">
              Each blueprint outlines how Univens connects business priorities
              with Indian technology, systems, and commercial capabilities—from
              initial uncertainty to measurable outcomes.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={cn(
                  "rounded-[4px] border px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
                  categoryFilter === cat
                    ? "border-[#135126] bg-[#135126] text-white"
                    : "border-[#D0CDD3] bg-white text-[#555555] hover:text-[#15293A]"
                )}
              >
                {cat === "all" ? "All Blueprints" : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="flex min-h-screen flex-col justify-center bg-white py-24 lg:py-32">
        <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:gap-12">
            {filtered.map((bp) => (
              <Card
                key={bp.slug}
                className="flex flex-col justify-between bg-[#FAFBF7] p-2 hover:border-[#135126]"
              >
                <CardHeader className="space-y-4 p-6 pb-4">
                  <div className="flex items-center gap-2 text-xs text-[#555555] tabular-nums">
                    <span className="font-medium text-[#135126]">
                      {bp.published}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{bp.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{bp.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl leading-snug">
                    {bp.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 p-6 pt-2">
                  <p className="text-sm leading-relaxed text-[#555555] sm:text-base">
                    {bp.summary}
                  </p>
                  <div className="grid grid-cols-3 gap-4 border-y border-[#D0CDD3]/80 py-5">
                    {bp.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-display text-lg font-bold text-[#135126] tabular-nums">
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-xs text-[#555555]">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => onSelectSlug(bp.slug)}
                  >
                    Open Full Blueprint
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
