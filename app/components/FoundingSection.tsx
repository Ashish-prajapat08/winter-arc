"use client";
import { useEffect, useRef } from "react";

export default function FoundingSection({ onCTAClick }: { onCTAClick: () => void }) {
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
    <section ref={ref} className="section" id="founding-cohort" style={{ backgroundColor: "#080808" }}>
      <div className="container-mid">
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto" }}>
          <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1.5rem" }}>Founding Cohort</span>

          <h2 className="headline fade-up delay-1" style={{ marginBottom: "1rem" }}>
            YOUR NEXT 90 DAYS<br />START HERE.
          </h2>
          <h2 className="headline fade-up delay-1" style={{ color: "#e8a830", marginBottom: "2.5rem" }}>
            ONE GOAL.<br />ONE SYSTEM.<br />ONE ARC.
          </h2>

          <p className="body-large fade-up delay-2" style={{ marginBottom: "2.5rem", textAlign: "center" }}>
            Be among the first people to build their Arc with us.
            The founding cohort will directly shape how Winter Arc works.
          </p>

          {/* Pricing */}
          <div className="fade-up delay-3" style={{
            padding: "2rem",
            border: "1px solid rgba(232,168,48,0.3)",
            background: "rgba(232,168,48,0.04)",
            marginBottom: "2.5rem",
          }}>
            <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.2em", color: "#e8a830", marginBottom: "0.75rem" }}>
              FOUNDING COHORT PRICING
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.35rem", justifyContent: "center", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "3.5rem", fontWeight: 900, lineHeight: 1, color: "#fff" }}>$12</span>
              <span style={{ fontSize: "0.9rem", color: "#555" }}>/ 90 days</span>
            </div>
            <p style={{ fontSize: "0.72rem", color: "#555" }}>
              Limited to the first 50 members.
              Payment collected when the cohort opens.
            </p>
          </div>

          <div className="fade-up delay-4" style={{ marginBottom: "1.5rem" }}>
            <button onClick={onCTAClick} className="btn-primary" id="founding-cta" style={{ width: "100%", maxWidth: "380px", minHeight: "58px", fontSize: "0.85rem" }}>
              JOIN THE FOUNDING COHORT →
            </button>
          </div>

          <div className="fade-up delay-5" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", border: "1px solid #1e1e1e" }}>
            {[
              { label: "COHORT SIZE", value: "50" },
              { label: "DURATION", value: "90 DAYS" },
              { label: "PAYMENT", value: "ON LAUNCH" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "1.25rem 1rem", textAlign: "center",
                borderRight: i < 2 ? "1px solid #1e1e1e" : "none",
              }}>
                <div style={{ fontSize: "0.48rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.4rem" }}>{s.label}</div>
                <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#ccc" }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
