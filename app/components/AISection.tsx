"use client";
import { useEffect, useRef } from "react";

export default function AISection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".fade-up");
            els.forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 120));
          }
        });
      },
      { threshold: 0.1 }
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
        <span className="fade-up" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#555", textTransform: "uppercase" }}>
          Behavioral Coaching
        </span>
        <h2
          className="fade-up delay-100"
          style={{
            fontSize: "clamp(1.6rem, 3.5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            marginTop: "1rem",
            marginBottom: "2rem",
            maxWidth: "640px",
          }}
        >
          AI that adapts. Not AI that screams &ldquo;YOU GOT THIS.&rdquo;
        </h2>

        <p className="fade-up delay-200" style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.75, maxWidth: "560px", marginBottom: "3rem" }}>
          Your plan shouldn&apos;t stay the same when your life changes.
          The system can eventually look at your check-ins, missed days and progress
          to help adjust your plan.
        </p>

        {/* Comparison */}
        <div
          className="fade-up delay-300"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            backgroundColor: "#2f2f2f",
            border: "1px solid #2f2f2f",
            marginBottom: "2rem",
          }}
        >
          {/* Bad */}
          <div style={{ padding: "2rem", backgroundColor: "#0a0a0a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: "#c0392b", textTransform: "uppercase" }}>✕ Motivational spam</span>
            </div>
            <div
              style={{
                padding: "1rem 1.25rem",
                backgroundColor: "#0d0808",
                border: "1px solid #1a0a0a",
                borderLeft: "3px solid #c0392b",
              }}
            >
              <p style={{ fontSize: "0.875rem", color: "#888", fontStyle: "italic", lineHeight: 1.65 }}>
                &ldquo;Stay motivated! You&apos;re doing great! 🔥 Keep going, champion!&rdquo;
              </p>
            </div>
            <p style={{ fontSize: "0.7rem", color: "#555", marginTop: "1rem", lineHeight: 1.6 }}>
              Feels good for 10 seconds. Does nothing.
            </p>
          </div>

          {/* Good */}
          <div style={{ padding: "2rem", backgroundColor: "#0a0a0a" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", color: "#e8a830", textTransform: "uppercase" }}>✓ Behavioral feedback</span>
            </div>
            <div
              style={{
                padding: "1rem 1.25rem",
                backgroundColor: "#0d0900",
                border: "1px solid #2a1a00",
                borderLeft: "3px solid #e8a830",
              }}
            >
              <p style={{ fontSize: "0.875rem", color: "#ccc", fontStyle: "italic", lineHeight: 1.65 }}>
                &ldquo;You&apos;ve missed three evening workouts this week. Your morning completion rate is 91%.
                Let&apos;s move your workout to mornings.&rdquo;
              </p>
            </div>
            <p style={{ fontSize: "0.7rem", color: "#666", marginTop: "1rem", lineHeight: 1.6 }}>
              Specific. Actionable. Based on your actual data.
            </p>
          </div>
        </div>

        <div
          className="fade-up delay-400"
          style={{
            padding: "1.25rem 1.5rem",
            border: "1px solid #2f2f2f",
            backgroundColor: "#111",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="#555" strokeWidth="1"/>
            <path d="M8 5v3.5l2 1.5" stroke="#555" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <p style={{ fontSize: "0.775rem", color: "#555", lineHeight: 1.6 }}>
            AI-assisted coaching is planned for future versions of the product. The first cohort will help define what this actually looks like.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .ai-compare-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
