"use client";
import { useState, useCallback } from "react";
import { track } from "@vercel/analytics";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import ComparisonSection from "./components/ComparisonSection";
import ArcJourneySection from "./components/ArcJourneySection";
import HowItWorksSection from "./components/HowItWorksSection";
import ArcTrackerSection from "./components/ArcTrackerSection";
import RecoverySection from "./components/RecoverySection";
import WeeklyReviewSection from "./components/WeeklyReviewSection";
import LeagueSection from "./components/LeagueSection";
import GoalTypesSection from "./components/GoalTypesSection";
import WhoSection from "./components/WhoSection";
import FoundingSection from "./components/FoundingSection";
import FAQSection from "./components/FAQSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import SignupModal from "./components/SignupModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);

  const open = useCallback((source?: string) => {
    track("cta_clicked", { source: source || "unknown" });
    setModalOpen(true);
  }, []);

  const close = useCallback(() => {
    setModalOpen(false);
  }, []);

  return (
    <>
      <Navbar onCTAClick={() => open("navbar")} />

      {/* 01 — Hero */}
      <HeroSection onCTAClick={() => open("hero")} />

      {/* 02 — Problem */}
      <ProblemSection />

      {/* 03 — Comparison */}
      <ComparisonSection />

      {/* 04 — See Your 90 Days */}
      <ArcJourneySection />

      {/* 05 — How It Works */}
      <HowItWorksSection />

      {/* 06 — Arc Tracker */}
      <ArcTrackerSection />

      {/* 07 — Recovery Mode */}
      <RecoverySection />

      {/* 08 — Weekly Intelligence */}
      <WeeklyReviewSection />

      {/* 09 — Accountability */}
      <LeagueSection />

      {/* 10 — Goal Types */}
      <GoalTypesSection />

      {/* 11 — Who It's For */}
      <WhoSection />

      {/* 12 — Founding Cohort */}
      <FoundingSection onCTAClick={() => open("founding_section")} />

      {/* 13 — FAQ */}
      <FAQSection />

      {/* 14 — Final CTA */}
      <FinalCTA onCTAClick={() => open("final_cta")} />

      {/* Footer */}
      <Footer />

      {/* Mobile sticky CTA — only visible on < 768px via CSS */}
      <div className="mobile-cta">
        <button
          onClick={() => open("mobile_sticky")}
          className="btn-primary"
          style={{ width: "100%", minHeight: "50px", fontSize: "0.78rem" }}
        >
          START YOUR ARC — $12 / 90 DAYS →
        </button>
      </div>

      {/* Signup modal */}
      <SignupModal open={modalOpen} onClose={close} />
    </>
  );
}
