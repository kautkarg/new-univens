import React, { useEffect, useState } from "react";
import { PageRoute } from "./data/univensData";
import { CxoBriefSelector } from "./components/CxoBriefSelector";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./components/ui/sheet";
import { AboutPage } from "./pages/AboutPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { OfferingsPage } from "./pages/OfferingsPage";
import { PossibilitiesPage } from "./pages/PossibilitiesPage";

function parseHashRoute(): { page: PageRoute; slug: string | null } {
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "home") return { page: "home", slug: null };
  if (raw === "about") return { page: "about", slug: null };
  if (raw === "offerings") return { page: "offerings", slug: null };
  if (raw.startsWith("offerings/")) {
    return {
      page: "offerings",
      slug: raw.replace("offerings/", "") || null,
    };
  }
  if (raw === "case-studies") return { page: "case-studies", slug: null };
  if (raw === "contact") return { page: "contact", slug: null };
  if (raw === "possibilities") return { page: "possibilities", slug: null };
  if (raw.startsWith("possibilities/")) {
    return {
      page: "possibilities",
      slug: raw.replace("possibilities/", "") || null,
    };
  }
  return { page: "home", slug: null };
}

export default function App() {
  const initial = parseHashRoute();
  const [activePage, setActivePage] = useState<PageRoute>(initial.page);
  const [routeSlug, setRouteSlug] = useState<string | null>(initial.slug);
  const [briefDrawerOpen, setBriefDrawerOpen] = useState(false);
  const [briefMode, setBriefMode] = useState<"brief" | "opportunities">("brief");
  const [preselectedStrength, setPreselectedStrength] = useState<string | null>(
    null
  );

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHashRoute();
      setActivePage(next.page);
      setRouteSlug(next.slug);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const handleNavigate = (page: PageRoute, slug?: string) => {
    const nextSlug = slug ?? null;
    setActivePage(page);
    setRouteSlug(nextSlug);
    const nextHash =
      (page === "possibilities" || page === "offerings") && nextSlug
        ? `#${page}/${nextSlug}`
        : `#${page}`;
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectBlueprintSlug = (slug: string | null) => {
    setRouteSlug(slug);
    const nextHash = slug ? `#possibilities/${slug}` : "#possibilities";
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenBrief = (
    defaultMode: "brief" | "opportunities" = "brief",
    strength?: string
  ) => {
    setBriefMode(defaultMode);
    setPreselectedStrength(strength ?? null);
    setBriefDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF7] text-[#15293A]">
      <Navbar
        activePage={activePage}
        activeOfferingId={activePage === "offerings" ? routeSlug : null}
        onNavigate={handleNavigate}
        onOpenBrief={handleOpenBrief}
      />

      <main className="flex-1">
        {activePage === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBrief={handleOpenBrief}
          />
        )}
        {activePage === "about" && (
          <AboutPage
            onNavigate={(p) => handleNavigate(p)}
            onOpenBrief={(mode) => handleOpenBrief(mode)}
          />
        )}
        {activePage === "offerings" && (
          <OfferingsPage
            selectedStrengthId={routeSlug}
            onSelectStrength={(id) =>
              handleNavigate("offerings", id === "all" ? undefined : id)
            }
            onNavigate={(p) => handleNavigate(p)}
            onOpenBrief={handleOpenBrief}
          />
        )}
        {activePage === "possibilities" && (
          <PossibilitiesPage
            selectedSlug={routeSlug}
            onSelectSlug={handleSelectBlueprintSlug}
            onNavigate={(p) => handleNavigate(p)}
            onOpenBrief={handleOpenBrief}
          />
        )}
        {activePage === "case-studies" && (
          <CaseStudiesPage
            onNavigate={(p) => handleNavigate(p)}
            onOpenBrief={handleOpenBrief}
          />
        )}
        {activePage === "contact" && (
          <ContactPage
            defaultMode={briefMode}
            preselectedStrength={preselectedStrength}
          />
        )}
      </main>

      <Footer
        onNavigate={(p) => handleNavigate(p)}
        onOpenBrief={(mode) => handleOpenBrief(mode)}
      />

      {/* Global Interactive CXO Brief & Opportunity Selector Drawer */}
      <Sheet open={briefDrawerOpen} onOpenChange={setBriefDrawerOpen}>
        <SheetContent side="right">
          <SheetHeader className="pb-4 border-b border-[#D0CDD3]">
            <SheetTitle>
              {briefMode === "brief"
                ? "Let's explore what's possible"
                : "Opportunity Preference Selector"}
            </SheetTitle>
            <SheetDescription>
              Share your priority or select the India capability opportunities
              relevant to your business.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5">
            <CxoBriefSelector
              compact
              initialMode={briefMode}
              preselectedStrength={preselectedStrength}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
