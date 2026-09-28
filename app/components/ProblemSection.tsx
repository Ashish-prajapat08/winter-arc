"use client";
import { useEffect, useRef } from "react";

const cycle = [
  { icon: "◉", label: "START", desc: "Motivated. Full plan.", col: "#e8a830" },
  { icon: "—", label: "MISS", desc: "One bad day.", col: "#555" },
  { icon: "↓", label: "MOMENTUM GONE", desc: "Guilt sets in.", col: "#555" },
  { icon: "✕", label: "QUIT", desc: "Start again Monday.", col: "#555" },
  { icon: "↻", label: "RESTART", desc: "Back to day one.", col: "#e8a830" },
];

export default function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".fade-up")
            .forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 90));
        }
      }),
      { threshold: 0.12 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="section" id="problem" style={{ backgroundColor: "#080808" }}>
      <div className="container-mid">
        <div className="fade-up" style={{ marginBottom: "3.5rem" }}>
          <span className="eyebrow" style={{ display: "block", marginBottom: "1rem" }}>The Real Problem</span>
          <h2 className="headline" style={{ marginBottom: "1.5rem" }}>
            You don&apos;t have a<br />knowledge problem.
          </h2>
          <h2 className="headline" style={{ color: "#e8a830" }}>
            You have a consistency problem.
          </h2>
        </div>

        <div className="fade-up delay-1" style={{ maxWidth: "560px", marginBottom: "4rem" }}>
          <p className="body-large" style={{ marginBottom: "1rem" }}>You know what you should be doing.</p>
          <p className="body-large" style={{ marginBottom: "1rem" }}>You start strong.</p>
          <p className="body-large" style={{ marginBottom: "1rem" }}>Life happens. You miss a day. Then another.</p>
          <p className="body-large" style={{ marginBottom: "1rem" }}>Momentum disappears. You tell yourself you&apos;ll restart Monday.</p>
          <p className="body-large" style={{ marginBottom: "1rem" }}>Monday becomes next Monday.</p>
          <p style={{ fontSize: "1rem", color: "#e8a830", fontWeight: 700 }}>Repeat.</p>
        </div>

        {/* Cycle visualization */}
        <div className="fade-up delay-2" style={{ marginBottom: "3rem" }}>
          <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.18em", color: "#333", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            The loop most programs ignore
          </div>
          <div className="cycle-wrap" style={{ display: "flex", alignItems: "center", gap: "0" }}>
            {cycle.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                <div style={{
                  flex: 1,
                  padding: "1.25rem 1rem",
                  border: "1px solid #1e1e1e",
                  borderRight: "none",
                  textAlign: "center",
                  background: i === 0 || i === 4 ? "rgba(232,168,48,0.05)" : "#0e0e0e",
                }}>
                  <div style={{ fontSize: "1.1rem", color: step.col, marginBottom: "0.35rem" }}>{step.icon}</div>
                  <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", color: step.col, marginBottom: "0.2rem" }}>{step.label}</div>
                  <div style={{ fontSize: "0.6rem", color: "#444", lineHeight: 1.4 }}>{step.desc}</div>
                </div>
                {i < cycle.length - 1 && (
                  <div style={{ color: "#333", fontSize: "0.8rem", flexShrink: 0, width: "1px", background: "#1e1e1e", height: "100%" }} />
                )}
              </div>
            ))}
            <div style={{ border: "1px solid #1e1e1e", borderLeft: "none", padding: "1.25rem 1rem", background: "#0e0e0e", flexShrink: 0 }}>
              <div style={{ fontSize: "1.1rem", color: "#333" }}>↺</div>
            </div>
          </div>
        </div>

        {/* Winter Arc response */}
        <div className="fade-up delay-3">
          <div style={{
            padding: "1.75rem 2rem",
            border: "1px solid rgba(232,168,48,0.25)",
            background: "rgba(232,168,48,0.04)",
            display: "flex", gap: "1.5rem", alignItems: "flex-start",
          }}>
            <div style={{ width: "2px", background: "#e8a830", flexShrink: 0, alignSelf: "stretch" }} />
            <div>
              <div style={{ fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", color: "#e8a830", marginBottom: "0.6rem" }}>WINTER ARC APPROACH</div>
              <p style={{ fontSize: "0.95rem", color: "#ccc", lineHeight: 1.7 }}>
                Winter Arc is designed to break that loop. Your Arc doesn&apos;t reset because you missed a day.
                You recover, adjust, and continue. One bad day shouldn&apos;t erase 20 good ones.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cycle-wrap { flex-direction: column !important; }
          .cycle-wrap > div { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
