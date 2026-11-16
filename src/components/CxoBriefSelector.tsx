import React, { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw } from "lucide-react";
import { CORE_STRENGTHS } from "../data/univensData";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export interface BriefSubmissionRecord {
  id: string;
  mode: "brief" | "opportunities";
  icpRole: "business" | "partner";
  interests: string[];
  objective: string;
  name: string;
  organization: string;
  email: string;
  submittedAt: string;
}

interface CxoBriefSelectorProps {
  initialMode?: "brief" | "opportunities";
  preselectedStrength?: string | null;
  compact?: boolean;
  onSubmitted?: (record: BriefSubmissionRecord) => void;
}

const OPPORTUNITY_TOPICS = [
  "India Engineering & Delivery Capacity",
  "Workflow Automation & AI Systems",
  "Market Access & Distribution Alliances",
  "Executive Roundtables & Blueprints",
];

const STORAGE_KEY = "univens_cxo_brief_latest";

export const CxoBriefSelector: React.FC<CxoBriefSelectorProps> = ({
  initialMode = "brief",
  preselectedStrength = null,
  compact = false,
  onSubmitted,
}) => {
  const [mode, setMode] = useState<"brief" | "opportunities">(initialMode);
  const [icpRole, setIcpRole] = useState<"business" | "partner">("business");
  const [selectedInterests, setSelectedInterests] = useState<string[]>(() =>
    preselectedStrength ? [preselectedStrength] : ["Direction"]
  );
  const [objective, setObjective] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [savedRecord, setSavedRecord] = useState<BriefSubmissionRecord | null>(
    null
  );

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (preselectedStrength) {
      setSelectedInterests((prev) =>
        prev.includes(preselectedStrength)
          ? prev
          : [...prev, preselectedStrength]
      );
    }
  }, [preselectedStrength]);

  useEffect(() => {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      if (existing) {
        const parsed = JSON.parse(existing) as BriefSubmissionRecord;
        if (parsed && parsed.email) {
          setSavedRecord(parsed);
        }
      }
    } catch {
      // Ignore storage read issues
    }
  }, []);

  const interestOptions =
    mode === "brief"
      ? CORE_STRENGTHS.map((s) => s.name)
      : [...CORE_STRENGTHS.map((s) => s.name), ...OPPORTUNITY_TOPICS];

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim()) {
      setErrorMsg("Please share your name so we know how to address you.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setErrorMsg("Please enter a valid work email address.");
      return;
    }
    if (selectedInterests.length === 0) {
      setErrorMsg("Select at least one area of focus or interest.");
      return;
    }
    if (mode === "brief" && !objective.trim()) {
      setErrorMsg(
        "Share a brief sentence on what you are working toward—no detailed spec required."
      );
      return;
    }

    const record: BriefSubmissionRecord = {
      id: `UNV-${Math.floor(1000 + Math.random() * 9000)}`,
      mode,
      icpRole,
      interests: selectedInterests,
      objective: objective.trim(),
      name: name.trim(),
      organization: organization.trim(),
      email: email.trim(),
      submittedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore storage write errors
    }

    setSavedRecord(record);
    onSubmitted?.(record);
  };

  const handleReset = () => {
    setSavedRecord(null);
    setErrorMsg(null);
    setObjective("");
  };

  if (savedRecord) {
    return (
      <div className="rounded-[6px] border border-[#427451]/30 bg-white/90 backdrop-blur-md p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-[#135126]" />
          <div className="space-y-1">
            <p className="text-xs font-medium text-[#135126] tabular-nums">
              Recorded · {savedRecord.id} · {savedRecord.submittedAt}
            </p>
            <h3 className="font-display text-2xl font-bold text-[#15293A]">
              {savedRecord.mode === "brief"
                ? "Your executive brief is ready for review."
                : "Your opportunity preferences are saved."}
            </h3>
            <p className="text-sm text-[#555555]">
              Thank you, {savedRecord.name}. We will respond to{" "}
              <span className="font-medium text-[#15293A]">
                {savedRecord.email}
              </span>{" "}
              with clear next steps—no noisy sales sequences.
            </p>
          </div>
        </div>

        <div className="rounded-[4px] border border-[#D0CDD3] bg-[#FAFBF7] p-4 space-y-3 text-sm">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#555555]">
            <span>
              Profile:{" "}
              <strong className="font-medium text-[#15293A]">
                {savedRecord.icpRole === "business"
                  ? "Business Decision-Maker"
                  : "Commercial / Tech Partner"}
              </strong>
            </span>
            {savedRecord.organization && (
              <span>
                Organization:{" "}
                <strong className="font-medium text-[#15293A]">
                  {savedRecord.organization}
                </strong>
              </span>
            )}
          </div>
          <div>
            <span className="text-xs text-[#555555]">Selected Focus Areas:</span>
            <p className="mt-1 font-medium text-[#15293A]">
              {savedRecord.interests.join(" · ")}
            </p>
          </div>
          {savedRecord.objective && (
            <div>
              <span className="text-xs text-[#555555]">Executive Context:</span>
              <p className="mt-1 text-[#15293A]">{savedRecord.objective}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-3.5 w-3.5" />
            Submit another brief or update preferences
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-[6px] border border-[#D0CDD3]/80 bg-white/85 backdrop-blur-md space-y-6",
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
      )}
    >
      {/* Mode Switcher */}
      <div className="space-y-2">
        <span className="block text-xs font-medium text-[#555555]">
          How would you like to engage?
        </span>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 rounded-[4px] border border-[#D0CDD3] bg-[#FAFBF7] p-1">
          <button
            type="button"
            onClick={() => setMode("brief")}
            className={cn(
              "rounded-[4px] px-4 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer",
              mode === "brief"
                ? "bg-[#135126] text-white"
                : "text-[#555555] hover:text-[#15293A]"
            )}
          >
            Explore Execution Brief
          </button>
          <button
            type="button"
            onClick={() => setMode("opportunities")}
            className={cn(
              "rounded-[4px] px-4 py-2.5 text-left text-sm font-medium transition-colors cursor-pointer",
              mode === "opportunities"
                ? "bg-[#135126] text-white"
                : "text-[#555555] hover:text-[#15293A]"
            )}
          >
            Register Opportunity Alerts
          </button>
        </div>
      </div>

      {/* ICP Role Selector */}
      <div className="space-y-2">
        <span className="block text-xs font-medium text-[#555555]">
          Your Perspective
        </span>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setIcpRole("business")}
            className={cn(
              "rounded-[4px] border p-3.5 text-left transition-all cursor-pointer",
              icpRole === "business"
                ? "border-[#135126] bg-[#DEEFE4]/40"
                : "border-[#D0CDD3] bg-white hover:border-[#15293A]/40"
            )}
          >
            <div className="font-display text-sm font-semibold text-[#15293A]">
              Founder / CXO / Business Leader
            </div>
            <p className="mt-0.5 text-xs text-[#555555]">
              Seeking specialist execution without building everything in-house
            </p>
          </button>
          <button
            type="button"
            onClick={() => setIcpRole("partner")}
            className={cn(
              "rounded-[4px] border p-3.5 text-left transition-all cursor-pointer",
              icpRole === "partner"
                ? "border-[#135126] bg-[#DEEFE4]/40"
                : "border-[#D0CDD3] bg-white hover:border-[#15293A]/40"
            )}
          >
            <div className="font-display text-sm font-semibold text-[#15293A]">
              Partner / Agency / Consultant
            </div>
            <p className="mt-0.5 text-xs text-[#555555]">
              Seeking dependable engineering & delivery capacity for clients
            </p>
          </button>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="space-y-2.5">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-medium text-[#555555]">
            {mode === "brief"
              ? "Capabilities or priorities involved"
              : "Opportunities of your interest"}
          </span>
          <span className="text-xs text-[#555555] tabular-nums">
            {selectedInterests.length} selected
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {interestOptions.map((item) => {
            const checked = selectedInterests.includes(item);
            return (
              <label
                key={item}
                className={cn(
                  "flex items-center gap-2.5 rounded-[4px] border px-3 py-2.5 text-sm transition-colors cursor-pointer",
                  checked
                    ? "border-[#135126] bg-[#FAFBF7] text-[#15293A] font-medium"
                    : "border-[#D0CDD3]/80 bg-white text-[#555555] hover:border-[#15293A]/40"
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleInterest(item)}
                />
                <span className="leading-tight">{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Objective */}
      <div className="space-y-1.5">
        <label
          htmlFor={`objective-${compact ? "drawer" : "page"}`}
          className="block text-xs font-medium text-[#555555]"
        >
          {mode === "brief"
            ? "What are you trying to achieve? (No formal specification needed)"
            : "Any specific region, sector, or partnership criteria? (Optional)"}
        </label>
        <Textarea
          id={`objective-${compact ? "drawer" : "page"}`}
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          placeholder={
            mode === "brief"
              ? "e.g., We want to automate order workflows across branches or build a dedicated product team in India..."
              : "e.g., B2B SaaS partnerships in APAC, industrial distribution, or AI workflow blueprints..."
          }
          className="min-h-[88px]"
        />
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="space-y-1">
          <label
            htmlFor={`name-${compact ? "drawer" : "page"}`}
            className="block text-xs font-medium text-[#555555]"
          >
            Your Name *
          </label>
          <Input
            id={`name-${compact ? "drawer" : "page"}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Sharad Mehta"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={`org-${compact ? "drawer" : "page"}`}
            className="block text-xs font-medium text-[#555555]"
          >
            Company / Role
          </label>
          <Input
            id={`org-${compact ? "drawer" : "page"}`}
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="e.g., Meridian Logistics"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor={`email-${compact ? "drawer" : "page"}`}
            className="block text-xs font-medium text-[#555555]"
          >
            Work Email *
          </label>
          <Input
            id={`email-${compact ? "drawer" : "page"}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
          />
        </div>
      </div>

      {errorMsg && (
        <p
          role="alert"
          className="rounded-[4px] border border-[#EB5F5A]/50 bg-[#FFC1BF]/25 px-3.5 py-2.5 text-sm text-[#15293A]"
        >
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
        <p className="text-xs text-[#555555]">
          Direct leadership response within 1 business day.
        </p>
        <Button type="submit" size="lg">
          {mode === "brief"
            ? "Send Executive Brief"
            : "Save Opportunity Preferences"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};
