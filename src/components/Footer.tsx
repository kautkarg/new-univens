import React from "react";
import { PageRoute } from "../data/univensData";
import { UnivensLogo } from "./UnivensLogo";
import { Separator } from "./ui/separator";

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBrief: (defaultMode?: "brief" | "opportunities") => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBrief }) => {
  return (
    <footer className="bg-[#15293A] text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 py-16 sm:px-6 lg:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <UnivensLogo variant="horizontal" surface="dark" />
            <p className="max-w-sm text-sm leading-relaxed text-[#DCE6EC]">
              Univens connects business opportunities with the specialist
              capabilities required to pursue them—turning executive priorities
              into accountable execution.
            </p>
            <p className="text-xs tracking-wide text-[#FFBB40]">
              Practical. Connected. Accountable.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div className="space-y-3">
              <h3 className="font-display text-sm font-semibold text-white">
                Company
              </h3>
              <ul className="space-y-2.5 text-sm text-[#DCE6EC]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("home")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Homepage
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("about")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("case-studies")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Case Studies
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("contact")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-sm font-semibold text-white">
                Capabilities
              </h3>
              <ul className="space-y-2.5 text-sm text-[#DCE6EC]">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("offerings")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    All Offerings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigate("possibilities")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Possibilities Blueprints
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenBrief("brief")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Submit CXO Brief
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenBrief("opportunities")}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Opportunity Updates
                  </button>
                </li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1 space-y-3">
              <h3 className="font-display text-sm font-semibold text-white">
                Connect
              </h3>
              <ul className="space-y-2.5 text-sm text-[#DCE6EC]">
                <li>Bengaluru · India Ecosystem</li>
                <li>
                  <a
                    href="mailto:connect@univens.com"
                    className="hover:text-white transition-colors"
                  >
                    connect@univens.com
                  </a>
                </li>
                <li className="pt-1 text-xs text-[#DEEFE4]">
                  For CXOs, Founders & Partners
                </li>
              </ul>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/15" />

        <div className="flex flex-col items-start justify-between gap-4 text-xs text-[#DCE6EC] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Univens. All rights reserved.</p>
          <p>Global ambition. Indian capabilities.</p>
        </div>
      </div>
    </footer>
  );
};
