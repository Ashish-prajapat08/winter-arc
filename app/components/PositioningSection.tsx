"use client";
import { useEffect, useRef } from "react";

export default function PositioningSection() {
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

  const pillars = [
    {
      number: "01",
      title: "PLAN",
      desc: "A clear 90-day goal and realistic daily actions built around your schedule and starting point.",
      detail: "Not a generic template. Your plan should reflect what you can actually do.",
      accent: false,
    },
    {
      number: "02",
      title: "ACCOUNTABILITY",
      desc: "Daily check-ins and small accountability groups that make showing up harder to ignore.",
      detail: "A small group of people working toward similar goals. Not a chatroom.",
      accent: false,
    },
    {
      number: "03",
      title: "RECOVERY",
      desc: "Missed a day? Don’t throw away the entire Arc. Get back on track.",
      detail: "One bad day shouldn’t become a bad month.",
      accent: true,
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: "clamp(4rem, 10vh, 8rem) clamp(1.5rem, 5vw, 6rem)",
        borderBottom: "1px solid #2f2f2f",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem" }}>
          <span
            className="fade-up"
            style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", color: "#555", textTransform: "uppercase" }}
          >
            The Difference
          </span>
          <h2
            className="fade-up delay-100"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginTop: "1rem",
              maxWidth: "600px",
            }}
          >
            Not another checklist.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            border: "1px solid #2f2f2f",
          }}
          className="pillars-grid"
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="fade-up"
              style={{
                padding: "2.5rem",
                borderRight: i < 2 ? "1px solid #2f2f2f" : "none",
                backgroundColor: pillar.accent ? "#0d0900" : "transparent",
                borderBottom: pillar.accent ? "3px solid #e8a830" : "3px solid transparent",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                if (!pillar.accent) e.currentTarget.style.backgroundColor = "#111";
              }}
              onMouseLeave={(e) => {
                if (!pillar.accent) e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div style={{ marginBottom: "2rem" }}>
                <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em", color: "#444" }}>
                  {pillar.number}
                </span>
              </div>
              <h3
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 800,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  color: pillar.accent ? "#e8a830" : "#fff",
                }}
              >
                {pillar.title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#888", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                {pillar.desc}
              </p>
              <p style={{ fontSize: "0.8rem", color: "#555", lineHeight: 1.65, fontStyle: "italic" }}>
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>

        <div
          className="fade-up delay-300"
          style={{
            marginTop: "3rem",
            padding: "2rem",
            border: "1px solid #2a1a00",
            backgroundColor: "#0d0900",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div style={{ width: "3px", height: "48px", backgroundColor: "#e8a830", flexShrink: 0 }} />
          <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 700, color: "#e8a830", letterSpacing: "-0.01em" }}>
            One bad day shouldn&apos;t become a bad month.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
          .pillars-grid > div { border-right: none !important; border-bottom: 1px solid #2f2f2f; }
          .pillars-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
