"use client";
import { useEffect, useRef } from "react";

export default function WhoSection() {
  const ref = useRef<HTMLDivElement>(null);
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

  const forYou = [
    "You&apos;ve started the same goal more than once",
    "You know what to do — you struggle to stay consistent",
    "You&apos;ve tried apps that didn&apos;t stick",
    "You want one goal done properly, not ten half-started",
    "You&apos;re willing to put in the work — just need the system",
    "You want accountability without a personal trainer",
  ];

  const notForYou = [
    "You&apos;re looking for quick results with no real effort",
    "You want an AI to do the thinking for you",
    "You need medical or therapeutic support",
    "You want a social media challenge, not a real system",
    "You&apos;re tracking more than three goals at once",
  ];

  return (
    <section ref={ref} className="section" id="who-its-for" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="container">
        <div style={{ marginBottom: "3.5rem" }}>
          <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>Who It&apos;s For</span>
          <h2 className="headline fade-up delay-1">Is Winter Arc for you?</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }} className="who-grid">
          {/* For you */}
          <div className="fade-up" style={{ padding: "2.25rem", border: "1px solid #1e1e1e", borderRight: "none", background: "rgba(34,197,94,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
              <div style={{ width: "8px", height: "8px", background: "#22c55e" }} />
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#22c55e", letterSpacing: "0.15em" }}>THIS IS FOR YOU IF</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {forYou.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#22c55e", fontSize: "0.7rem", flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
                  <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))}
            </div>
          </div>

          {/* Not for you */}
          <div className="fade-up delay-1" style={{ padding: "2.25rem", border: "1px solid #1e1e1e", background: "rgba(239,68,68,0.02)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.75rem" }}>
              <div style={{ width: "8px", height: "8px", background: "#ef4444" }} />
              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#ef4444", letterSpacing: "0.15em" }}>NOT FOR YOU IF</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {notForYou.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ color: "#ef4444", fontSize: "0.7rem", flexShrink: 0, marginTop: "0.1rem" }}>—</span>
                  <p style={{ fontSize: "0.82rem", color: "#666", lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: item }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .who-grid { grid-template-columns: 1fr !important; }
          .who-grid > div:first-child { border-right: 1px solid #1e1e1e !important; }
        }
      `}</style>
    </section>
  );
}
