"use client";
import { useEffect, useRef } from "react";

export default function AccountabilitySection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target
              .querySelectorAll(".fade-up")
              .forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 90));
        }),
      { threshold: 0.1 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const members = [
    { label: "YOU", days: 24, pct: 87, accent: true },
    { label: "MEMBER 2", days: 23, pct: 83, accent: false },
    { label: "MEMBER 3", days: 22, pct: 80, accent: false },
    { label: "MEMBER 4", days: 20, pct: 74, accent: false },
  ];

  return (
    <section ref={ref} className="section" style={{ backgroundColor: "#080808" }}>
      <div className="container">
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
          className="cohort-grid"
        >
          {/* Left — copy */}
          <div>
            <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>
              Accountability
            </span>
            <h2 className="headline fade-up delay-1" style={{ marginBottom: "1.5rem" }}>
              You don&apos;t have to
              <br />
              do it alone.
            </h2>
            <p className="body-large fade-up delay-2" style={{ marginBottom: "2rem" }}>
              A small group of people working toward similar goals. Not a chatroom. Not a leaderboard.
              An accountability layer.
            </p>
            <p className="body-large fade-up delay-3" style={{ marginBottom: "2rem" }}>
              Rankings are based on how consistently you execute your own plan — not who can do the
              most push-ups or spend the most hours working.
            </p>

            <div
              className="fade-up delay-4"
              style={{ padding: "1.25rem 1.5rem", border: "1px solid #1e1e1e", background: "#0c0c0c" }}
            >
              <div
                style={{
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  color: "#555",
                  letterSpacing: "0.14em",
                  marginBottom: "0.5rem",
                }}
              >
                ADHERENCE SCORE
              </div>
              <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.6 }}>
                Your score is based on{" "}
                <strong style={{ color: "#ccc" }}>your own plan</strong>. A person running 3km a day and
                a person building a product can compete fairly.
              </p>
            </div>
          </div>

          {/* Right — cohort UI */}
          <div className="fade-up delay-2">
            <div style={{ background: "#0f0f0f", border: "1px solid #1e1e1e" }}>
              {/* Header */}
              <div
                style={{
                  padding: "1rem 1.25rem",
                  borderBottom: "1px solid #1e1e1e",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.5rem",
                      color: "#444",
                      letterSpacing: "0.14em",
                      marginBottom: "0.2rem",
                    }}
                  >
                    YOUR COHORT
                  </div>
                  <div style={{ fontSize: "0.75rem", fontWeight: 800, color: "#e8a830" }}>
                    WINTER ARC — SEPTEMBER
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.5rem", color: "#444", letterSpacing: "0.1em" }}>DAY</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 900 }}>24</div>
                  <div style={{ fontSize: "0.48rem", color: "#444" }}>/ 90</div>
                </div>
              </div>

              {/* Summary stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0",
                  borderBottom: "1px solid #1e1e1e",
                }}
              >
                {[
                  { label: "YOUR CONSISTENCY", value: "87%", col: "#e8a830" },
                  { label: "STILL ACTIVE", value: "82%", col: "#22c55e" },
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{ padding: "0.85rem 1.25rem", borderRight: i === 0 ? "1px solid #1e1e1e" : "none" }}
                  >
                    <div
                      style={{ fontSize: "0.48rem", color: "#444", letterSpacing: "0.12em", marginBottom: "0.3rem" }}
                    >
                      {s.label}
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 800, color: s.col }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Members */}
              <div style={{ padding: "0.75rem 1.25rem" }}>
                <div
                  style={{ fontSize: "0.48rem", color: "#333", letterSpacing: "0.14em", marginBottom: "0.75rem" }}
                >
                  CONSISTENCY RANKING
                </div>
                {members.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: m.accent ? "0.65rem 1.25rem" : "0.65rem 0",
                      marginLeft: m.accent ? "-1.25rem" : "0",
                      marginRight: m.accent ? "-1.25rem" : "0",
                      borderBottom: i < members.length - 1 ? "1px solid #1a1a1a" : "none",
                      background: m.accent ? "rgba(232,168,48,0.04)" : "transparent",
                    }}
                  >
                    <span style={{ fontSize: "0.6rem", color: "#333", minWidth: "16px" }}>{i + 1}</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "0.3rem",
                        }}
                      >
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <span
                            style={{
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              color: m.accent ? "#e8a830" : "#aaa",
                            }}
                          >
                            {m.label}
                          </span>
                          {m.accent && (
                            <span
                              style={{
                                fontSize: "0.45rem",
                                padding: "0.1rem 0.35rem",
                                border: "1px solid rgba(232,168,48,0.4)",
                                color: "#e8a830",
                                fontWeight: 700,
                                letterSpacing: "0.1em",
                              }}
                            >
                              YOU
                            </span>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            color: m.accent ? "#e8a830" : "#555",
                            fontWeight: 700,
                          }}
                        >
                          {m.pct}%
                        </span>
                      </div>
                      <div style={{ height: "2px", background: "#1a1a1a" }}>
                        <div
                          style={{
                            width: `${m.pct}%`,
                            height: "100%",
                            background: m.accent ? "#e8a830" : "#333",
                            transition: "width 1s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: "0.75rem 1.25rem",
                  borderTop: "1px solid #1e1e1e",
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#555" }} />
                <span style={{ fontSize: "0.52rem", color: "#444", letterSpacing: "0.08em" }}>
                  Adherence = how consistently you follow your own plan
                </span>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.55rem",
                color: "#333",
                textAlign: "center",
                marginTop: "0.6rem",
                letterSpacing: "0.08em",
              }}
            >
              Accountability cohorts — planned for the first cohort
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .cohort-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
