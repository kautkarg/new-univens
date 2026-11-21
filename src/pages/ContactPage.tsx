import React from "react";
import { Mail, MapPin } from "lucide-react";
import { CxoBriefSelector } from "../components/CxoBriefSelector";
import { GeometricFrame } from "../components/UnivensLogo";
import { Separator } from "../components/ui/separator";

interface ContactPageProps {
  defaultMode?: "brief" | "opportunities";
  preselectedStrength?: string | null;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  defaultMode = "brief",
  preselectedStrength = null,
}) => {
  return (
    <section className="section-viewport relative flex flex-col justify-center w-full overflow-hidden sage-mist-band pt-[calc(var(--navbar-height,80px)+1.25rem)] pb-[calc(var(--navbar-height,80px)+1.25rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 fluted-glass-overlay opacity-40"
      />
      <div className="relative z-10 mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Left Context & Expectations */}
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-medium text-[#135126]">
                Connect with Univens
              </p>
              <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-[#15293A] sm:text-4xl lg:text-[42px]">
                Share what you are working toward.
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-[#284054]">
                You do not need to arrive with a perfectly defined technical
                problem or a complete solution in mind. Tell us what matters to
                your business, and we will help map a practical path from
                uncertainty to execution.
              </p>
            </div>

            <GeometricFrame className="rounded-[6px] border border-[#D0CDD3] bg-white p-5 sm:p-6 space-y-3">
              <h2 className="font-display text-base font-semibold text-[#15293A]">
                What happens after you share your brief
              </h2>
              <Separator />
              <ol className="space-y-3.5 text-sm text-[#284054]">
                <li className="flex gap-3">
                  <span className="font-display font-bold text-[#135126] tabular-nums">
                    01.
                  </span>
                  <span>
                    A Univens partner reviews your priorities directly—never an
                    automated sales bot.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-bold text-[#135126] tabular-nums">
                    02.
                  </span>
                  <span>
                    We schedule a focused 25-minute alignment conversation to
                    clarify scope and deliverables.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-bold text-[#135126] tabular-nums">
                    03.
                  </span>
                  <span>
                    You receive a clear capability and execution plan with one
                    point of accountability.
                  </span>
                </li>
              </ol>
            </GeometricFrame>

            <div className="space-y-3 pt-1 text-sm text-[#284054]">
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#135126]" />
                <a
                  href="mailto:connect@univens.com"
                  className="font-medium text-[#15293A] hover:text-[#135126]"
                >
                  connect@univens.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#135126]" />
                <span>Bengaluru · India Capability Ecosystem</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Selector */}
          <div className="lg:col-span-6 lg:col-start-7">
            <CxoBriefSelector
              initialMode={defaultMode}
              preselectedStrength={preselectedStrength}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
