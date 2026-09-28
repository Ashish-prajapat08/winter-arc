"use client";
import { useEffect, useRef, useState } from "react";

export default function WeeklyReviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".fade-up").forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 90));
      }),
      { threshold: 0.08 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="section" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}
          className="weekly-grid">

          {/* Left — Weekly Review card */}
          <div className="fade-up">
            <div style={{ background: "#0f0f0f", border: "1px solid #1e1e1e" }}>
              {/* Header */}
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #1e1e1e", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: "0.45rem", color: "#3b82f6", letterSpacing: "0.14em", fontWeight: 700, marginBottom: "0.15rem" }}>PRODUCT PREVIEW — EXAMPLE REVIEW</div>
                  <div style={{ fontSize: "0.5rem", color: "#e8a830", letterSpacing: "0.14em", fontWeight: 700, marginBottom: "0.2rem" }}>WEEK 04 REVIEW</div>
                  <div style={{ fontSize: "0.72rem", color: "#777" }}>Run a half marathon</div>
                </div>
                <div style={{ fontSize: "0.55rem", color: "#444", letterSpacing: "0.1em" }}>DAY 28</div>
              </div>

              {/* Consistency bar */}
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #1e1e1e" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.52rem", color: "#555", letterSpacing: "0.12em" }}>CONSISTENCY</span>
                  <span style={{ fontSize: "0.52rem", color: "#e8a830", fontWeight: 700 }}>87%</span>
                </div>
                <div style={{ height: "3px", background: "#1e1e1e" }}>
                  <div style={{ width: "87%", height: "100%", background: "#e8a830" }} />
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid #1e1e1e" }}>
                {[
                  { label: "WORKOUTS", value: "4/5" },
                  { label: "ACTIVE DAYS", value: "6/7" },
                  { label: "PROGRESS", value: "-1.8kg", green: true },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "0.85rem 1rem", borderRight: i < 2 ? "1px solid #1e1e1e" : "none", textAlign: "center" }}>
                    <div style={{ fontSize: "0.47rem", color: "#444", letterSpacing: "0.12em", marginBottom: "0.3rem" }}>{s.label}</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: s.green ? "#22c55e" : "#ccc" }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Pattern */}
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #1e1e1e", background: "rgba(232,168,48,0.04)" }}>
                <div style={{ fontSize: "0.5rem", fontWeight: 700, color: "#e8a830", letterSpacing: "0.14em", marginBottom: "0.6rem" }}>PATTERN DETECTED</div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ flex: 1, padding: "0.6rem", background: "rgba(34,197,94,0.07)", border: "1px solid rgba(34,197,94,0.15)" }}>
                    <div style={{ fontSize: "0.48rem", color: "#22c55e", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>MORNING</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#22c55e" }}>91%</div>
                  </div>
                  <div style={{ flex: 1, padding: "0.6rem", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.15)" }}>
                    <div style={{ fontSize: "0.48rem", color: "#ef4444", letterSpacing: "0.1em", marginBottom: "0.3rem" }}>EVENING</div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#ef4444" }}>54%</div>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #1e1e1e" }}>
                <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.5rem" }}>NEXT WEEK ADJUSTMENT</div>
                <p style={{ fontSize: "0.78rem", color: "#aaa", lineHeight: 1.55 }}>
                  Move your default workout time to <strong style={{ color: "#fff" }}>7:00 AM</strong>.
                  You complete 91% of morning sessions vs 54% in the evenings.
                </p>
              </div>

              <div style={{ padding: "1rem 1.25rem" }}>
                <button
                  onClick={() => setApplied(true)}
                  style={{
                    width: "100%", padding: "0.7rem",
                    background: applied ? "rgba(34,197,94,0.1)" : "#e8a830",
                    color: applied ? "#22c55e" : "#000",
                    border: applied ? "1px solid rgba(34,197,94,0.3)" : "none",
                    cursor: "pointer",
                    fontSize: "0.62rem", fontWeight: 800,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    transition: "all 0.3s",
                  }}
                >
                  {applied ? "✓ APPLIED TO YOUR PLAN" : "APPLY TO MY PLAN"}
                </button>
              </div>
            </div>
            <p style={{ fontSize: "0.58rem", color: "#333", textAlign: "center", marginTop: "0.6rem", letterSpacing: "0.08em" }}>
              Interactive preview
            </p>
          </div>

          {/* Right — copy */}
          <div>
            <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>Weekly Intelligence</span>
            <h2 className="headline fade-up delay-1" style={{ marginBottom: "1.5rem" }}>
              Know what&apos;s actually working.
            </h2>
            <p className="body-large fade-up delay-2" style={{ marginBottom: "2rem" }}>
              Every week you get a structured review of how your Arc is going.
              Not a motivational message. A clear summary of what worked, what did not, and one adjustment to make next week.
            </p>

            {/* Comparison */}
            <div className="fade-up delay-3" style={{ marginBottom: "2rem" }}>
              <div style={{
                padding: "1rem 1.25rem",
                background: "#0c0c0c",
                border: "1px solid #1e1e1e",
                marginBottom: "0.5rem",
              }}>
                <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.4rem" }}>NOT THIS</div>
                <div style={{ fontSize: "0.82rem", color: "#555", fontStyle: "italic" }}>
                  &ldquo;Great job this week! You&apos;re doing amazing! Keep it up! 🔥&rdquo;
                </div>
              </div>
              <div style={{
                padding: "1rem 1.25rem",
                background: "rgba(232,168,48,0.04)",
                border: "1px solid rgba(232,168,48,0.2)",
              }}>
                <div style={{ fontSize: "0.5rem", color: "#e8a830", letterSpacing: "0.14em", fontWeight: 700, marginBottom: "0.4rem" }}>THIS</div>
                <div style={{ fontSize: "0.82rem", color: "#aaa", fontStyle: "italic" }}>
                  &ldquo;You complete 91% of morning sessions vs 54% in evenings. Move workouts to mornings next week.&rdquo;
                </div>
              </div>
            </div>

            <div className="fade-up delay-4" style={{
              padding: "1.25rem 1.5rem",
              border: "1px solid #1e1e1e",
              background: "#0c0c0c",
            }}>
              <p style={{ fontSize: "0.82rem", color: "#e8a830", fontWeight: 600, lineHeight: 1.6 }}>
                &ldquo;AI-assisted coaching is planned for the first product version. The weekly review and plan adjustments shown here reflect how the system is designed to work.&rdquo;
              </p>
              <p style={{ fontSize: "0.75rem", color: "#555", marginTop: "0.5rem", lineHeight: 1.5 }}>
                Weekly intelligence and behavior-based plan adaptation are core to what Winter Arc will do.
                The screens above are product previews of how this will look.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .weekly-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
