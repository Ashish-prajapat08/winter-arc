"use client";
import { useEffect, useRef } from "react";

export default function FinalCTA({ onCTAClick }: { onCTAClick: () => void }) {
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
    <section ref={ref} style={{
      padding: "clamp(6rem, 14vh, 10rem) clamp(1.25rem, 5vw, 5rem)",
      backgroundColor: "#080808",
      borderTop: "1px solid #1e1e1e",
      textAlign: "center",
    }}>
      <div className="container-narrow">
        <h2
          className="fade-up"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 0.92,
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          YOUR NEXT 90<br />DAYS START HERE.
        </h2>

        <p className="fade-up delay-1 body-large" style={{ marginBottom: "3rem", textAlign: "center" }}>
          One goal. One system. One Arc.<br />
          90 days is long enough to change something real.<br />
          Short enough to commit to.
        </p>

        <div className="fade-up delay-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <button onClick={onCTAClick} className="btn-primary" id="final-cta" style={{ minWidth: "320px", minHeight: "60px", fontSize: "0.88rem" }}>
            START YOUR ARC →
          </button>
          <p style={{ fontSize: "0.68rem", color: "#444", letterSpacing: "0.08em" }}>
            Founding cohort · $12 / 90 days
          </p>
        </div>
      </div>
    </section>
  );
}
