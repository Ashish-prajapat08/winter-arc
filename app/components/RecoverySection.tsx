"use client";
import { useEffect, useRef, useState } from "react";

export default function RecoverySection() {
  const ref = useRef<HTMLDivElement>(null);
  const [accepted, setAccepted] = useState(false);

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
    <section ref={ref} className="section" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
          className="recovery-grid">
          {/* Left */}
          <div>
            <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>Recovery Mode</span>
            <h2 className="headline fade-up delay-1" style={{ marginBottom: "1.5rem" }}>
              YOU WILL MISS DAYS.
            </h2>
            <h2 className="headline fade-up delay-1" style={{ color: "#e8a830", marginBottom: "2rem" }}>
              The difference is<br />what happens next.
            </h2>

            <div className="fade-up delay-2" style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[
                { label: "MISSED DAY", desc: "Something came up. Your plan breaks.", col: "#ef4444", bg: "rgba(239,68,68,0.05)" },
                { label: "RECOVERY MODE", desc: "Winter Arc adjusts. Your Arc doesn't reset.", col: "#3b82f6", bg: "rgba(59,130,246,0.05)" },
                { label: "ADJUSTED PLAN", desc: "Reduce today. Keep the weekly goal intact.", col: "#e8a830", bg: "rgba(232,168,48,0.05)" },
                { label: "CONTINUE", desc: "Day 22 missed → Day 23 recovery → Day 24 done.", col: "#22c55e", bg: "rgba(34,197,94,0.05)" },
              ].map((row, i) => (
                <div key={i} style={{
                  display: "flex", gap: "1rem", alignItems: "center",
                  padding: "1rem 1.25rem",
                  border: "1px solid #1a1a1a",
                  borderBottom: "none",
                  background: row.bg,
                }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: row.col, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.56rem", fontWeight: 700, color: row.col, letterSpacing: "0.12em", marginBottom: "0.2rem" }}>{row.label}</div>
                    <div style={{ fontSize: "0.78rem", color: "#666" }}>{row.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{ height: "1px", background: "#1a1a1a" }} />
            </div>

            <div className="fade-up delay-3" style={{ marginTop: "2rem" }}>
              <p style={{ fontSize: "0.85rem", color: "#e8a830", fontWeight: 600 }}>
                &ldquo;Don&apos;t restart. Recover.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — Product UI mockup */}
          <div className="fade-up delay-2">
            <div style={{
              background: "#0f0f0f",
              border: "1px solid #1e1e1e",
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}>
              {/* Header */}
              <div style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid #1e1e1e",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div>
                  <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.2rem" }}>DAY 23</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#3b82f6" }}>⟲ RECOVERY MODE</div>
                </div>
                <div style={{
                  fontSize: "0.52rem", fontWeight: 700, color: "#3b82f6",
                  border: "1px solid rgba(59,130,246,0.3)",
                  padding: "0.2rem 0.5rem",
                  letterSpacing: "0.1em",
                }}>ACTIVE</div>
              </div>

              {/* What happened */}
              <div style={{ padding: "1.1rem 1.25rem", borderBottom: "1px solid #1e1e1e" }}>
                <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.5rem" }}>YESTERDAY</div>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", padding: "0.75rem", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                  <span style={{ fontSize: "0.75rem", color: "#ef4444" }}>✕</span>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "#ccc", marginBottom: "0.2rem" }}>Morning workout missed</div>
                    <div style={{ fontSize: "0.65rem", color: "#555" }}>Schedule changed — work ran late.</div>
                  </div>
                </div>
              </div>

              {/* Recovery plan */}
              <div style={{ padding: "1.1rem 1.25rem", borderBottom: "1px solid #1e1e1e" }}>
                <div style={{ fontSize: "0.5rem", color: "#3b82f6", letterSpacing: "0.14em", fontWeight: 700, marginBottom: "0.5rem" }}>WINTER ARC RESPONSE</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ fontSize: "0.78rem", color: "#aaa", lineHeight: 1.6 }}>
                    Move today&apos;s run to 7 PM. Reduce to 25 minutes.<br />
                    Your weekly consistency stays intact.
                  </div>
                </div>
              </div>

              {/* Today plan */}
              <div style={{ padding: "1.1rem 1.25rem", borderBottom: "1px solid #1e1e1e" }}>
                <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.14em", marginBottom: "0.6rem" }}>TODAY&apos;S RECOVERY PLAN</div>
                {[
                  { label: "25 min easy run — 7 PM", done: accepted },
                  { label: "8,000 steps", done: false },
                  { label: "No intensity target today", done: false },
                ].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                    <div style={{
                      width: "12px", height: "12px",
                      border: "1px solid",
                      borderColor: t.done ? "#3b82f6" : "#2a2a2a",
                      background: t.done ? "#3b82f6" : "transparent",
                      flexShrink: 0,
                    }}>
                      {t.done && <span style={{ fontSize: "7px", color: "#fff", fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>✓</span>}
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "#777" }}>{t.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ padding: "1rem 1.25rem" }}>
                <button
                  onClick={() => setAccepted(true)}
                  style={{
                    width: "100%", padding: "0.75rem",
                    background: accepted ? "#1a2a1a" : "#3b82f6",
                    color: accepted ? "#22c55e" : "#fff",
                    border: accepted ? "1px solid rgba(34,197,94,0.3)" : "none",
                    cursor: "pointer",
                    fontSize: "0.65rem", fontWeight: 800,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    transition: "all 0.3s",
                  }}
                >
                  {accepted ? "✓ RECOVERY PLAN ACCEPTED — ARC CONTINUES" : "ACCEPT RECOVERY PLAN"}
                </button>
              </div>
            </div>
            <p style={{ fontSize: "0.58rem", color: "#333", textAlign: "center", marginTop: "0.6rem", letterSpacing: "0.08em" }}>
              Interactive preview — click the button above
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .recovery-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
