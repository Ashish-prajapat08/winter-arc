"use client";
import { useEffect, useRef } from "react";

export default function ComparisonSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".fade-up").forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 100));
      }),
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="section" style={{ backgroundColor: "#080808" }}>
      <div className="container">
        <div style={{ marginBottom: "3rem" }}>
          <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>The Difference</span>
          <h2 className="headline fade-up delay-1">Not another checklist.</h2>
        </div>

        <div
          className="compare-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "3rem" }}
        >
          {/* LEFT — Normal tracker */}
          <div className="fade-up" style={{
            padding: "2.25rem",
            border: "1px solid #1e1e1e",
            borderRight: "none",
            background: "#0c0c0c",
          }}>
            <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", color: "#444", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Normal Habit Tracker
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem" }}>
              {["Workout", "Read", "Meditate", "Drink water"].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <div style={{ width: "14px", height: "14px", border: "1px solid #2a2a2a", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.85rem", color: "#555" }}>{t}</span>
                </div>
              ))}
            </div>
            <div style={{
              padding: "0.9rem 1rem",
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.15)",
              borderRadius: "0",
            }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#ef4444", letterSpacing: "0.1em", marginBottom: "0.35rem" }}>MISSED A DAY</div>
              <div style={{ fontSize: "0.8rem", color: "#666" }}>&quot;Your streak is broken. Start over.&quot;</div>
            </div>
          </div>

          {/* RIGHT — Winter Arc */}
          <div className="fade-up delay-1" style={{
            padding: "2.25rem",
            border: "1px solid rgba(232,168,48,0.25)",
            background: "rgba(232,168,48,0.03)",
          }}>
            <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", color: "#e8a830", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Winter Arc
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem" }}>
              {[
                { step: "GOAL", label: "Run a half marathon" },
                { step: "PLAN", label: "Built around your schedule" },
                { step: "ACTION", label: "Daily check-in" },
                { step: "ADAPT", label: "Plan changes with you" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    fontSize: "0.48rem", fontWeight: 700, letterSpacing: "0.12em",
                    color: "#e8a830", minWidth: "44px",
                  }}>{row.step}</div>
                  <div style={{ width: "1px", height: "14px", background: "#2a1a00" }} />
                  <span style={{ fontSize: "0.82rem", color: "#999" }}>{row.label}</span>
                </div>
              ))}
            </div>
            <div style={{
              padding: "0.9rem 1rem",
              background: "rgba(34,197,94,0.05)",
              border: "1px solid rgba(34,197,94,0.15)",
            }}>
              <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.1em", marginBottom: "0.35rem" }}>MISSED A DAY</div>
              <div style={{ fontSize: "0.8rem", color: "#888" }}>&quot;Let&apos;s adjust the plan. Your Arc continues.&quot;</div>
            </div>
          </div>
        </div>

        {/* Quote callout */}
        <div className="fade-up delay-2" style={{
          padding: "1.75rem 2rem",
          border: "1px solid #1e1e1e",
          background: "#0c0c0c",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", fontWeight: 700, color: "#ccc", letterSpacing: "-0.01em" }}>
            &ldquo;You don&apos;t need a better Monday.
            You need a system that survives Tuesday.&rdquo;
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .compare-grid { grid-template-columns: 1fr !important; }
          .compare-grid > div:first-child { border-right: 1px solid #1e1e1e !important; border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
