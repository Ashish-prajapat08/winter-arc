"use client";
import { useEffect, useRef } from "react";

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".fade-up");
            els.forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 100));
          }
        });
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 6rem)",
        borderBottom: "1px solid #2f2f2f",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h2
          className="fade-up"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: "2.5rem",
            maxWidth: "700px",
          }}
        >
          You don&apos;t need another habit tracker.
        </h2>

        <div
          className="fade-up delay-100"
          style={{
            maxWidth: "560px",
            marginBottom: "4rem",
          }}
        >
          <p style={{ fontSize: "1.05rem", color: "#aaa", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            You already know what you should be doing.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#aaa", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            The problem is doing it consistently.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#888", lineHeight: 1.75 }}>
            You start strong. Miss a day. Miss another. Lose momentum. Start again next Monday.
          </p>
          <p style={{ fontSize: "1.05rem", color: "#e8a830", lineHeight: 1.75, marginTop: "1.5rem", fontWeight: 600 }}>
            Winter Arc is built around breaking that cycle.
          </p>
        </div>

        {/* The cycle visualization */}
        <div className="fade-up delay-200">
          <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            The cycle most programs ignore
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: "0",
              marginBottom: "2rem",
              border: "1px solid #2f2f2f",
            }}
            className="cycle-grid"
          >
            {[
              { label: "Start", icon: "●", desc: "Motivated, full plan" },
              { label: "Miss", icon: "—", desc: "One bad day" },
              { label: "Lose momentum", icon: "↓", desc: "Guilt sets in" },
              { label: "Quit", icon: "✕", desc: ""I\'ll restart Monday"" },
              { label: "Restart", icon: "↻", desc: "Back to day 1" },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  padding: "1.5rem 1rem",
                  borderRight: i < 4 ? "1px solid #2f2f2f" : "none",
                  textAlign: "center",
                  backgroundColor: i === 4 ? "#111" : "transparent",
                }}
                className="cycle-step"
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: i === 0 ? "#e8a830" : i === 4 ? "#e8a830" : "#555" }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.25rem", color: i === 0 || i === 4 ? "#fff" : "#666" }}>
                  {step.label}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#444", lineHeight: 1.4 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0",
              border: "1px solid #e8a830",
              borderRadius: "0",
            }}
            className="arc-grid"
          >
            {[
              { label: "Commit", icon: "◆", desc: "Set a real 90-day goal" },
              { label: "Execute", icon: "▶", desc: "Daily plan, daily check-in" },
              { label: "Recover", icon: "⟲", desc: "Miss a day? Get back on track" },
              { label: "Continue", icon: "→", desc: "One Arc. 90 days." },
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  padding: "1.5rem 1rem",
                  borderRight: i < 3 ? "1px solid #2a1a00" : "none",
                  textAlign: "center",
                  backgroundColor: "#0d0900",
                }}
                className="arc-step"
              >
                <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "#e8a830" }}>
                  {step.icon}
                </div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", marginBottom: "0.25rem", color: "#e8a830" }}>
                  {step.label}
                </div>
                <div style={{ fontSize: "0.65rem", color: "#7a5a20", lineHeight: 1.4 }}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: "8px", height: "8px", backgroundColor: "#e8a830", borderRadius: "50%" }} />
            <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "#e8a830", textTransform: "uppercase" }}>
              Winter Arc
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cycle-grid { grid-template-columns: 1fr 1fr !important; }
          .cycle-step:nth-child(5) { grid-column: 1 / -1; border-right: none !important; }
          .arc-grid { grid-template-columns: 1fr 1fr !important; }
          .arc-step { border-bottom: 1px solid #2a1a00; }
        }
      `}</style>
    </section>
  );
}
