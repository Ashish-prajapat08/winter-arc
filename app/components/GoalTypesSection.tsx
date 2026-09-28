"use client";
import { useEffect, useRef } from "react";

const GOALS = [
  { cat: "FITNESS", icon: "◉", example: "Run a half marathon.", detail: "Training plan built around your current level and schedule." },
  { cat: "HEALTH", icon: "◆", example: "Build a consistent sleep routine.", detail: "Track habits that affect energy, mood, and recovery." },
  { cat: "CAREER", icon: "▤", example: "Become interview-ready in 90 days.", detail: "Daily prep targets, mock schedules, and accountability." },
  { cat: "LEARNING", icon: "→", example: "Complete a programming curriculum.", detail: "Break a skill into 90 days of deliberate practice." },
  { cat: "BUSINESS", icon: "◈", example: "Launch my first product.", detail: "Weekly milestones, daily tasks, accountability to ship." },
  { cat: "PERSONAL", icon: "⬡", example: "Build a consistent morning routine.", detail: "Anchor habits that set the tone for the rest of the day." },
];

export default function GoalTypesSection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".fade-up").forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 70));
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
          <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>Goal Types</span>
          <h2 className="headline fade-up delay-1" style={{ maxWidth: "560px", marginBottom: "1rem" }}>
            Winter Arc works for<br />any meaningful goal.
          </h2>
          <p className="body-large fade-up delay-2" style={{ maxWidth: "480px" }}>
            It&apos;s not a fitness app. It&apos;s not a productivity app. It&apos;s a system that works for any goal worth pursuing over 90 days.
          </p>
        </div>

        <div
          className="goals-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}
        >
          {GOALS.map((g, i) => (
            <div
              key={i}
              className="fade-up"
              style={{
                padding: "1.75rem",
                border: "1px solid #1e1e1e",
                borderRight: (i % 3 === 2) ? "1px solid #1e1e1e" : "none",
                borderBottom: i < 3 ? "none" : "1px solid #1e1e1e",
                transition: "background 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(232,168,48,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
                <span style={{ fontSize: "1rem", color: "#2a2a2a" }}>{g.icon}</span>
                <span style={{ fontSize: "0.55rem", fontWeight: 800, letterSpacing: "0.18em", color: "#555", textTransform: "uppercase" }}>{g.cat}</span>
              </div>
              <div style={{
                fontSize: "0.82rem", fontWeight: 600, color: "#e8a830",
                fontStyle: "italic", marginBottom: "0.75rem",
              }}>
                &ldquo;{g.example}&rdquo;
              </div>
              <p style={{ fontSize: "0.75rem", color: "#555", lineHeight: 1.55 }}>{g.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .goals-grid { grid-template-columns: 1fr 1fr !important; }
          .goals-grid > div { border-right: 1px solid #1e1e1e !important; border-bottom: none !important; }
          .goals-grid > div:nth-child(even) { border-right: none !important; }
          .goals-grid > div:last-child { border-bottom: 1px solid #1e1e1e !important; }
        }
        @media (max-width: 480px) {
          .goals-grid { grid-template-columns: 1fr !important; }
          .goals-grid > div { border-right: 1px solid #1e1e1e !important; }
        }
      `}</style>
    </section>
  );
}
