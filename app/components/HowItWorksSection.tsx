"use client";
import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    label: "CHOOSE YOUR GOAL",
    desc: "One specific, meaningful goal for the next 90 days.",
    example: "Run a half marathon.",
    icon: "◆",
  },
  {
    n: "02",
    label: "BUILD YOUR PLAN",
    desc: "A realistic daily system built around your schedule and life — not a generic template.",
    example: "3 runs/week, 8k steps daily.",
    icon: "▤",
  },
  {
    n: "03",
    label: "SHOW UP DAILY",
    desc: "Daily check-ins keep you accountable. Your small cohort makes it harder to disappear.",
    example: "Check in before 9 PM.",
    icon: "✓",
  },
  {
    n: "04",
    label: "TRACK YOUR ARC",
    desc: "See 90 days of your actual behavior. Every day completed, missed, or recovered.",
    example: "Day 24 / 90 — Streak: 6",
    icon: "◉",
  },
  {
    n: "05",
    label: "RECOVER WHEN YOU MISS",
    desc: "Missed a day? Recovery Mode adjusts your plan. Your Arc does not reset. You continue.",
    example: "Recovery plan activated.",
    icon: "⟲",
  },
  {
    n: "06",
    label: "ADAPT TO REALITY",
    desc: "Your plan changes when your behavior changes. Winter Arc detects patterns and adjusts.",
    example: "Moved workouts to 7 AM.",
    icon: "→",
  },
];

export default function HowItWorksSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target
              .querySelectorAll(".fade-up")
              .forEach((el, i) =>
                setTimeout(() => el.classList.add("visible"), i * 90)
              );
        }),
      { threshold: 0.08 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="section" id="how-it-works" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="container">
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>
            How It Works
          </span>
          <h2 className="headline fade-up delay-1" style={{ maxWidth: "560px" }}>
            GOAL → PLAN → EXECUTE
            <br />→ TRACK → ADAPT → CONTINUE
          </h2>
        </div>

        <div
          className="steps-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              className="fade-up"
              style={{
                padding: "2rem",
                border: "1px solid #1e1e1e",
                borderRight: i % 3 === 2 ? "1px solid #1e1e1e" : "none",
                borderBottom: i < 3 ? "none" : "1px solid #1e1e1e",
                background: "transparent",
                transition: "background 0.25s",
                cursor: "default",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0e0e0e")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <span style={{ fontSize: "0.55rem", fontWeight: 700, color: "#333", letterSpacing: "0.12em" }}>
                  {step.n}
                </span>
                <span style={{ fontSize: "1.2rem", color: "#2a2a2a" }}>{step.icon}</span>
              </div>
              <h3
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#fff",
                  marginBottom: "0.75rem",
                }}
              >
                {step.label}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.65, marginBottom: "1rem" }}>
                {step.desc}
              </p>
              <div
                style={{
                  padding: "0.6rem 0.8rem",
                  background: "#0c0c0c",
                  border: "1px solid #1e1e1e",
                  fontSize: "0.72rem",
                  color: "#e8a830",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                {step.example}
              </div>
            </div>
          ))}
        </div>

        <div
          className="fade-up"
          style={{
            marginTop: "2px",
            padding: "1.5rem 2rem",
            border: "1px solid #1e1e1e",
            background: "#0c0c0c",
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
          }}
        >
          <div style={{ width: "2px", height: "40px", background: "#e8a830", flexShrink: 0 }} />
          <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: 1.6 }}>
            The first cohort will help shape exactly how these steps work. Your feedback is part of how
            we build this.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          .steps-grid > div { border-right: 1px solid #1e1e1e !important; border-bottom: none !important; }
          .steps-grid > div:last-child { border-bottom: 1px solid #1e1e1e !important; }
        }
      `}</style>
    </section>
  );
}
