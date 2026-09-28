"use client";
import { useEffect, useRef, useState } from "react";

type DayState = "done" | "missed" | "recovery" | "today" | "upcoming";

function buildDays(): { n: number; state: DayState }[] {
  const days = [];
  for (let i = 1; i <= 90; i++) {
    let state: DayState = "upcoming";
    if (i < 22) state = "done";
    if (i === 9) state = "missed";
    if (i === 10) state = "recovery";
    if (i === 22) state = "missed";
    if (i === 23) state = "recovery";
    if (i === 24) state = "today";
    days.push({ n: i, state });
  }
  return days;
}

const STATE_COLOR: Record<DayState, string> = {
  done: "#e8a830",
  missed: "#ef4444",
  recovery: "#3b82f6",
  today: "#ffffff",
  upcoming: "#1e1e1e",
};
const STATE_LABEL: Record<DayState, string> = {
  done: "Completed", missed: "Missed", recovery: "Recovery", today: "Today", upcoming: "Upcoming",
};

export default function ArcTrackerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const days = buildDays();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".fade-up").forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 80));
      }),
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const day = active ? days[active - 1] : null;

  return (
    <section ref={ref} className="section" id="arc-tracker" style={{ backgroundColor: "#080808" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}
          className="tracker-grid">

          {/* Left — explanation */}
          <div>
            <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>90-Day Arc Tracker</span>
            <h2 className="headline fade-up delay-1" style={{ marginBottom: "1.5rem" }}>
              Your Arc doesn&apos;t reset because you missed one day.
            </h2>
            <p className="body-large fade-up delay-2" style={{ marginBottom: "2rem" }}>
              Every day you complete, miss, or recover is part of your Arc.
              One bad day doesn&apos;t erase 20 good ones.
            </p>

            {/* Legend */}
            <div className="fade-up delay-3" style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              {(["done", "today", "recovery", "missed", "upcoming"] as DayState[]).map((s) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <div style={{
                    width: "10px", height: "10px",
                    background: STATE_COLOR[s],
                    border: s === "upcoming" ? "1px solid #2a2a2a" : "none",
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: "0.72rem", color: "#666", letterSpacing: "0.05em" }}>{STATE_LABEL[s]}</span>
                </div>
              ))}
            </div>

            {/* Recovery callout */}
            <div className="fade-up delay-4" style={{
              marginTop: "2rem",
              padding: "1.25rem 1.5rem",
              border: "1px solid rgba(59,130,246,0.25)",
              background: "rgba(59,130,246,0.04)",
            }}>
              <div style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.14em", color: "#3b82f6", marginBottom: "0.5rem" }}>
                RECOVERY MODE — DAYS 10 &amp; 23
              </div>
              <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.6 }}>
                When you miss a day, Winter Arc activates Recovery Mode. Your plan adjusts.
                Your Arc continues. The goal stays intact.
              </p>
            </div>
          </div>

          {/* Right — grid */}
          <div className="fade-up delay-1">
            <div style={{
              background: "#0f0f0f",
              border: "1px solid #1e1e1e",
              padding: "1.5rem",
            }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid #1e1e1e" }}>
                <div>
                  <div style={{ fontSize: "0.52rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.25rem" }}>YOUR ARC</div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#e8a830" }}>RUN A HALF MARATHON</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "1.4rem", fontWeight: 900, lineHeight: 1 }}>24</div>
                  <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.1em" }}>/ 90 DAYS</div>
                </div>
              </div>

              {/* Dot grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(15, 1fr)",
                gap: "4px",
                marginBottom: "1rem",
              }}>
                {days.map((d) => (
                  <button
                    key={d.n}
                    onMouseEnter={() => setActive(d.n)}
                    onMouseLeave={() => setActive(null)}
                    title={`Day ${d.n} — ${STATE_LABEL[d.state]}`}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      background: STATE_COLOR[d.state],
                      border: d.n === active ? "1px solid #fff" : "none",
                      cursor: "pointer",
                      transition: "transform 0.1s",
                      transform: d.n === active ? "scale(1.3)" : "none",
                    }}
                  />
                ))}
              </div>

              {/* Tooltip */}
              <div style={{
                padding: "0.6rem 0.75rem",
                background: "#0c0c0c",
                border: "1px solid #1e1e1e",
                fontSize: "0.68rem",
                color: day ? STATE_COLOR[day.state] : "#333",
                minHeight: "32px",
                transition: "color 0.15s",
                letterSpacing: "0.06em",
              }}>
                {day
                  ? `Day ${day.n} — ${STATE_LABEL[day.state]}`
                  : "Hover over a day to inspect it"}
              </div>

              {/* Summary stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", marginTop: "0.75rem" }}>
                {[
                  { label: "COMPLETED", value: "20", col: "#e8a830" },
                  { label: "MISSED", value: "2", col: "#ef4444" },
                  { label: "RECOVERED", value: "2", col: "#3b82f6" },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: "0.75rem",
                    border: "1px solid #1e1e1e",
                    borderRight: i < 2 ? "none" : "1px solid #1e1e1e",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "0.48rem", color: "#444", letterSpacing: "0.12em", marginBottom: "0.25rem" }}>{s.label}</div>
                    <div style={{ fontSize: "1rem", fontWeight: 900, color: s.col }}>{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .tracker-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
