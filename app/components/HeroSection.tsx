"use client";
import { useEffect, useRef } from "react";

export default function HeroSection({ onCTAClick }: { onCTAClick: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    const timer = setTimeout(() => {
      elements?.forEach((el, i) => {
        setTimeout(() => el.classList.add("visible"), i * 120);
      });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(6rem, 12vh, 10rem) clamp(1.5rem, 5vw, 6rem) clamp(4rem, 8vh, 6rem)",
        position: "relative",
        borderBottom: "1px solid #2f2f2f",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(47,47,47,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(47,47,47,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", position: "relative" }}>
        {/* Eyebrow */}
        <div
          className="fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "#e8a830",
              borderRadius: "50%",
            }}
          />
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e8a830",
            }}
          >
            WINTER ARC 2026
          </span>
        </div>

        {/* Headline */}
        <h1
          className="fade-up delay-100"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            textTransform: "uppercase",
            marginBottom: "2rem",
            maxWidth: "900px",
          }}
        >
          90 DAYS.
          <br />
          <span style={{ color: "#e8a830" }}>ONE</span> TRANS-
          <br />
          FORMATION.
        </h1>

        {/* Subheadline */}
        <p
          className="fade-up delay-200"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "#aaa",
            lineHeight: 1.65,
            maxWidth: "520px",
            marginBottom: "2.5rem",
          }}
        >
          Stop starting over every Monday.
          <br />
          Build a 90-day goal, get a plan built around your life,
          stay accountable, and see how far you can actually go.
        </p>

        {/* CTA */}
        <div
          className="fade-up delay-300"
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "0.75rem" }}
        >
          <button
            onClick={onCTAClick}
            className="btn-primary"
            id="hero-cta"
            style={{ fontSize: "0.85rem" }}
          >
            JOIN THE FOUNDING COHORT
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span style={{ fontSize: "0.75rem", color: "#555", letterSpacing: "0.05em" }}>
            First cohort is limited. No payment required now.
          </span>
        </div>

        {/* 90-day progress visualization */}
        <div
          className="fade-up delay-400"
          style={{ marginTop: "5rem" }}
        >
          <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "#555", textTransform: "uppercase" }}>
              Your 90-day arc
            </span>
            <div style={{ flex: 1, height: "1px", background: "#2f2f2f" }} />
          </div>
          <DayGrid />
        </div>
      </div>

      {/* Sticky CTA for mobile */}
      <div
        className="mobile-sticky-cta"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1rem 1.5rem",
          backgroundColor: "rgba(10,10,10,0.95)",
          borderTop: "1px solid #2f2f2f",
          zIndex: 50,
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={onCTAClick}
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
        >
          JOIN THE FOUNDING COHORT
        </button>
      </div>

      <style>{`
        .mobile-sticky-cta { display: none !important; }
        @media (max-width: 768px) {
          .mobile-sticky-cta { display: block !important; }
        }
      `}</style>
    </section>
  );
}

function DayGrid() {
  // 90 days represented as small squares
  const days = Array.from({ length: 90 }, (_, i) => i + 1);

  const getColor = (day: number) => {
    if (day <= 12) return "#e8a830"; // completed - accent
    if (day <= 14) return "#2a2a2a"; // missed
    if (day <= 28) return "#e8a830";
    if (day === 29) return "#2a2a2a";
    if (day <= 30) return "#2a2a2a";
    if (day <= 90) return "#1a1a1a"; // future
    return "#1a1a1a";
  };

  const getOpacity = (day: number) => {
    if (day <= 30) return 1;
    if (day <= 60) return 0.5;
    return 0.25;
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(30, 1fr)",
        gap: "3px",
        maxWidth: "600px",
      }}
    >
      {days.map((day) => (
        <div
          key={day}
          title={`Day ${day}`}
          style={{
            height: "8px",
            backgroundColor: getColor(day),
            opacity: getOpacity(day),
            borderRadius: "1px",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scaleY(1.5)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scaleY(1)")}
        />
      ))}
    </div>
  );
}
