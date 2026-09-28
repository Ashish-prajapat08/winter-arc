"use client";
import { useEffect, useRef } from "react";

const MILESTONES = [
  { day: "DAY 01", tag: "WHERE YOU ARE", quote: "I keep restarting. Maybe this time.", mood: "neutral", detail: "Choose your goal. Your plan is built around your actual schedule." },
  { day: "DAY 03", tag: "FIRST ACTIONS", quote: "Okay, I actually did it.", mood: "positive", detail: "Complete your first daily actions. Small wins build momentum." },
  { day: "DAY 09", tag: "MISS A DAY", quote: "I knew this would happen.", mood: "warning", detail: "Recovery Mode activates. Your Arc doesn't reset — it adjusts." },
  { day: "DAY 10", tag: "RECOVERY", quote: "Wait — I'm still in it.", mood: "positive", detail: "Adjusted plan for today. Your weekly goal stays intact." },
  { day: "DAY 21", tag: "PATTERN DETECTED", quote: "I actually prefer mornings.", mood: "positive", detail: "Winter Arc is designed to notice patterns in your check-ins and suggest adjustments." },
  { day: "DAY 30", tag: "FIRST REVIEW", quote: "Something is actually changing.", mood: "positive", detail: "Week 4 review: 83% consistency. The plan adjusts to keep your goal realistic." },
  { day: "DAY 45", tag: "PLAN ADAPTS", quote: "This is starting to feel normal.", mood: "positive", detail: "Behavior-based plan adjustments are planned for the first product version." },
  { day: "DAY 60", tag: "MOMENTUM", quote: "I don't need as much motivation.", mood: "great", detail: "Consistency at 87%. You've missed days and kept going." },
  { day: "DAY 90", tag: "ARC COMPLETE", quote: "I actually finished something.", mood: "great", detail: "Your first Arc is done. Review how far you came from Day 1. Start your next one from a stronger baseline." },
];

const moodColor: Record<string, string> = {
  neutral: "#555", positive: "#22c55e", warning: "#e8a830", great: "#e8a830",
};
const moodBg: Record<string, string> = {
  neutral: "transparent", positive: "rgba(34,197,94,0.04)",
  warning: "rgba(232,168,48,0.06)", great: "rgba(232,168,48,0.08)",
};

export default function ArcJourneySection() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".fade-up").forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 70));
      }),
      { threshold: 0.06 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="section" style={{ backgroundColor: "#080808" }}>
      <div className="container">
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>Your 90-Day Arc</span>
          <h2 className="headline fade-up delay-1" style={{ maxWidth: "620px" }}>
            See your Arc before you start it.
          </h2>
          <p className="body-large fade-up delay-2" style={{ marginTop: "1rem", maxWidth: "520px" }}>
            This is a conceptual visualization — not a guarantee. Every Arc is different. But this is what the system is designed to make possible.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0" }}>
          {/* Timeline line */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "2rem", paddingTop: "0.4rem" }}>
            <div style={{ width: "1px", flex: 1, background: "linear-gradient(to bottom, #e8a830, #333 60%, #1e1e1e)" }} />
          </div>

          {/* Milestones */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0" }}>
            {MILESTONES.map((m, i) => (
              <div
                key={i}
                className="fade-up"
                style={{
                  display: "flex", gap: "1rem", alignItems: "flex-start",
                  padding: "1.25rem 1.5rem",
                  marginBottom: "2px",
                  border: "1px solid #1a1a1a",
                  background: moodBg[m.mood],
                  transition: "background 0.3s",
                  position: "relative",
                }}
              >
                {/* Dot on the line */}
                <div style={{
                  position: "absolute", left: "-2.5rem", top: "50%",
                  transform: "translateY(-50%)",
                  width: "8px", height: "8px",
                  borderRadius: "50%",
                  background: moodColor[m.mood],
                  border: "1px solid " + moodColor[m.mood],
                  flexShrink: 0,
                }} />

                <div style={{ minWidth: "60px" }}>
                  <div style={{ fontSize: "0.55rem", fontWeight: 800, color: moodColor[m.mood], letterSpacing: "0.1em" }}>{m.day}</div>
                </div>
                <div style={{ width: "1px", background: "#1e1e1e", alignSelf: "stretch", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.52rem", fontWeight: 700, letterSpacing: "0.14em", color: "#444", marginBottom: "0.25rem" }}>{m.tag}</div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: moodColor[m.mood], marginBottom: "0.35rem", fontStyle: "italic" }}>
                    &ldquo;{m.quote}&rdquo;
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#555", lineHeight: 1.5 }}>{m.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fade-up" style={{ marginTop: "2rem" }}>
          <p style={{ fontSize: "0.7rem", color: "#333", fontStyle: "italic" }}>
            ✦ Individual results will vary. This visualization shows how the system is designed to work — not what is guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
