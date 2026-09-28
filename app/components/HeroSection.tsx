"use client";
import { useEffect, useRef, useState } from "react";

const TASKS = [
  { label: "30 min run", done: true },
  { label: "8,000 steps", done: true },
  { label: "Protein target", done: false },
  { label: "10 min mobility", done: false },
];

export default function HeroSection({ onCTAClick }: { onCTAClick: () => void }) {
  const [tasksDone, setTasksDone] = useState([true, true, false, false]);
  const [pct, setPct] = useState(27);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      const els = ref.current?.querySelectorAll(".fade-up");
      els?.forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 100));
    }, 80);
    return () => clearTimeout(t);
  }, []);

  // Animate progress ring on mount
  const circumference = 2 * Math.PI * 44;
  const dashOffset = circumference - (pct / 100) * circumference;

  const toggleTask = (i: number) => {
    const next = [...tasksDone];
    next[i] = !next[i];
    setTasksDone(next);
    const done = next.filter(Boolean).length;
    setPct(Math.round((done / next.length) * 100 + (27 - 2 * done)));
  };

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        paddingTop: "clamp(7rem, 14vh, 10rem)",
        paddingBottom: "clamp(4rem, 8vh, 6rem)",
        paddingLeft: "clamp(1.25rem, 5vw, 5rem)",
        paddingRight: "clamp(1.25rem, 5vw, 5rem)",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #252525",
        backgroundColor: "#080808",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* LEFT — COPY */}
          <div>
            <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#e8a830" }} />
              <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", color: "#e8a830", textTransform: "uppercase" }}>
                WINTER ARC 2026
              </span>
            </div>

            <h1
              className="fade-up delay-1"
              style={{
                fontSize: "clamp(3.4rem, 9vw, 8rem)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                textTransform: "uppercase",
                marginBottom: "1.75rem",
              }}
            >
              90 DAYS.<br />
              <span style={{ color: "#e8a830" }}>ONE</span>{" "}
              TRANS<wbr />FORMATION.
            </h1>

            <div className="fade-up delay-2" style={{ marginBottom: "2.25rem", maxWidth: "460px" }}>
              <p style={{ fontSize: "1rem", color: "#888", lineHeight: 1.75, marginBottom: "0.75rem" }}>
                Stop restarting every Monday.
              </p>
              <p style={{ fontSize: "1rem", color: "#888", lineHeight: 1.75, marginBottom: "0.75rem" }}>
                Choose one meaningful goal. Build a system around your actual life.
                Stay accountable. Recover when you fall off.
              </p>
              <p style={{ fontSize: "1rem", color: "#666", lineHeight: 1.75 }}>
                See how far 90 days can actually take you.
              </p>
            </div>

            <div className="fade-up delay-3" style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center", marginBottom: "1.25rem" }}>
              <button onClick={onCTAClick} className="btn-primary" id="hero-cta">
                START YOUR ARC →
              </button>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost"
              >
                SEE HOW IT WORKS ↓
              </button>
            </div>

            <div className="fade-up delay-4">
              <p style={{ fontSize: "0.68rem", color: "#444", letterSpacing: "0.08em" }}>
                Founding cohort pricing · Limited first cohort
              </p>
            </div>
          </div>

          {/* RIGHT — PRODUCT DASHBOARD */}
          <div className="fade-up delay-2 hero-dashboard">
            <div
              style={{
                background: "#111",
                border: "1px solid #222",
                padding: "0",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Header */}
              <div style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid #1e1e1e",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <div style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.18em", color: "#555", textTransform: "uppercase", marginBottom: "0.2rem" }}>
                    YOUR WINTER ARC
                  </div>
                  <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#e8a830", letterSpacing: "0.06em" }}>
                    RUN A HALF MARATHON
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.1em", marginBottom: "0.15rem" }}>DAY</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: 900, lineHeight: 1, color: "#fff" }}>24</div>
                  <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.1em" }}>/ 90</div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ padding: "0.9rem 1.25rem", borderBottom: "1px solid #1e1e1e" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.52rem", color: "#555", letterSpacing: "0.12em" }}>PROGRESS</span>
                  <span style={{ fontSize: "0.52rem", color: "#e8a830", letterSpacing: "0.1em", fontWeight: 700 }}>27%</span>
                </div>
                <div style={{ height: "3px", background: "#1e1e1e", borderRadius: "2px" }}>
                  <div style={{ width: "27%", height: "100%", background: "#e8a830", borderRadius: "2px", transition: "width 1.4s cubic-bezier(0.22,1,0.36,1)" }} />
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #1e1e1e" }}>
                {[
                  { label: "CONSISTENCY", value: "87%", accent: true },
                  { label: "STREAK", value: "6 DAYS", accent: false },
                  { label: "COHORT", value: "TOP 12%", accent: false },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: "0.85rem 1rem",
                    borderRight: i < 2 ? "1px solid #1e1e1e" : "none",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "0.48rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.3rem" }}>{s.label}</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: s.accent ? "#e8a830" : "#fff", letterSpacing: "-0.01em" }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Today's actions */}
              <div style={{ padding: "0.9rem 1.25rem", borderBottom: "1px solid #1e1e1e" }}>
                <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.7rem" }}>TODAY&apos;S ACTIONS</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {TASKS.map((task, i) => (
                    <button
                      key={i}
                      onClick={() => toggleTask(i)}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.6rem",
                        background: "none", border: "none", cursor: "pointer",
                        textAlign: "left", padding: 0,
                      }}
                    >
                      <div style={{
                        width: "14px", height: "14px", border: "1px solid",
                        borderColor: tasksDone[i] ? "#e8a830" : "#333",
                        backgroundColor: tasksDone[i] ? "#e8a830" : "transparent",
                        flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s",
                      }}>
                        {tasksDone[i] && <span style={{ fontSize: "8px", color: "#000", fontWeight: 900 }}>✓</span>}
                      </div>
                      <span style={{
                        fontSize: "0.7rem", color: tasksDone[i] ? "#555" : "#bbb",
                        textDecoration: tasksDone[i] ? "line-through" : "none",
                        transition: "color 0.2s",
                      }}>{task.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus + CTA */}
              <div style={{ padding: "0.9rem 1.25rem" }}>
                <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.4rem" }}>TODAY&apos;S FOCUS</div>
                <div style={{ fontSize: "0.75rem", color: "#aaa", marginBottom: "0.9rem" }}>Run before 9 AM — keep it short if needed.</div>
                <button
                  onClick={onCTAClick}
                  style={{
                    width: "100%", padding: "0.7rem",
                    background: "#e8a830", color: "#000",
                    border: "none", cursor: "pointer",
                    fontSize: "0.65rem", fontWeight: 800,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  START YOUR ARC
                </button>
              </div>
            </div>

            <p style={{ fontSize: "0.58rem", color: "#333", textAlign: "center", marginTop: "0.75rem", letterSpacing: "0.08em" }}>
              Interactive preview — click the checkboxes
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .hero-dashboard { max-width: 480px; margin: 0 auto; width: 100%; }
        }
      `}</style>
    </section>
  );
}
