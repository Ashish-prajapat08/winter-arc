"use client";
import { useState, useEffect, useRef } from "react";

const QUESTIONS = [
  {
    q: "What is Winter Arc?",
    a: "Winter Arc is a 90-day personal transformation and accountability system. You choose one meaningful goal, build a daily plan around your actual life, and stay accountable through daily check-ins and a small accountability cohort. When you miss a day, Winter Arc doesn't reset — it helps you recover and continue.",
  },
  {
    q: "Is Winter Arc a fitness app?",
    a: "No. Winter Arc works for any meaningful 90-day goal — fitness, health, career development, learning, business, or personal habits. The system is goal-agnostic. Your plan is built around what you're trying to achieve, not a predefined fitness program.",
  },
  {
    q: "Can I use Winter Arc for career, learning, or business goals?",
    a: "Yes. Examples include: becoming interview-ready, completing a programming curriculum, launching a product, building a morning routine, or developing a consistent creative practice. If it can be broken into a 90-day system, Winter Arc is built to support it.",
  },
  {
    q: "What happens if I miss a day?",
    a: "Your Arc does not reset. Winter Arc activates Recovery Mode — instead of losing your streak and starting over, you get an adjusted plan for the next day that keeps your weekly goal intact. One bad day shouldn't become a bad month.",
  },
  {
    q: "How does the plan adapt?",
    a: "Winter Arc tracks your check-in patterns and identifies what's working and what isn't. If you consistently complete morning actions at 91% but evening ones at 54%, it recommends moving your default time to the morning. Your plan changes when your behavior changes.",
  },
  {
    q: "Is there an AI coach?",
    a: "AI-assisted behavioral coaching is planned for the first product version. The goal is to surface real patterns in your check-in data and suggest specific plan adjustments — not generic motivational messages. The weekly review and adaptive plan screens shown on this page are previews of how this is designed to work.",
  },
  {
    q: "How does accountability work?",
    a: "A small cohort of people working toward similar goals. Rankings are based on how consistently you follow your own plan — not who can do the most push-ups or spend the most hours working. Accountability cohorts are planned for the first cohort.",
  },
  {
    q: "How long is an Arc?",
    a: "One Arc is 90 days. Long enough to change something real. Short enough to commit to. After completing an Arc, you can start a new one with updated goals and a stronger baseline.",
  },
  {
    q: "How much does Winter Arc cost?",
    a: "The founding cohort is $12 for your first 90-day Arc. This is a founding cohort price and will likely change for future cohorts. Payment is collected when the cohort opens — you're only reserving your spot now.",
  },
  {
    q: "When does the first cohort launch?",
    a: "The founding cohort is in the planning stage. People who sign up now will be contacted first when the cohort opens. You'll have the option to confirm your spot at that time.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting)
          e.target.querySelectorAll(".fade-up").forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 50));
      }),
      { threshold: 0.06 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="section" id="faq" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="container-mid">
        <div style={{ marginBottom: "3rem" }}>
          <span className="eyebrow fade-up" style={{ display: "block", marginBottom: "1rem" }}>FAQ</span>
          <h2 className="headline fade-up delay-1">Frequently asked questions</h2>
        </div>

        <div>
          {QUESTIONS.map((item, i) => (
            <div
              key={i}
              className="fade-up"
              style={{ borderBottom: "1px solid #1a1a1a" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between",
                  alignItems: "center", gap: "1.5rem",
                  background: "none", border: "none", cursor: "pointer",
                  padding: "1.5rem 0", textAlign: "left",
                }}
              >
                <span style={{
                  fontSize: "clamp(0.88rem, 1.5vw, 1rem)",
                  fontWeight: 600, color: "#ddd",
                  lineHeight: 1.4,
                }}>
                  {item.q}
                </span>
                <span style={{
                  fontSize: "1.25rem", color: "#e8a830", flexShrink: 0,
                  transform: open === i ? "rotate(45deg)" : "none",
                  transition: "transform 0.25s",
                }}>
                  +
                </span>
              </button>
              <div style={{
                maxHeight: open === i ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}>
                <p style={{
                  fontSize: "0.9rem", color: "#666", lineHeight: 1.75,
                  paddingBottom: "1.5rem",
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
