"use client";
import { useState, useEffect } from "react";

interface Props { open: boolean; onClose: () => void; }

type FormData = {
  email: string;
  goal: string;
  blocker: string;
  name: string;
  willingness: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const GOALS = [
  "Fitness — run, strength, endurance",
  "Health — sleep, nutrition, energy",
  "Career — get a job, get promoted, upskill",
  "Learning — programming, language, skill",
  "Business — launch, grow, ship",
  "Personal — morning routine, habits, focus",
  "Other",
];

const BLOCKERS = [
  "I start strong but lose momentum",
  "I miss a day and can't get back on track",
  "I don't have accountability",
  "My plan isn't realistic for my schedule",
  "I get distracted by too many goals",
  "I don't know what to do each day",
  "Other",
];

export default function SignupModal({ open, onClose }: Props) {
  const [data, setData] = useState<FormData>({ email: "", goal: "", blocker: "", name: "", willingness: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (): boolean => {
    const errs: Errors = {};
    if (!data.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) errs.email = "Valid email required";
    if (!data.goal) errs.goal = "Select your 90-day goal";
    if (!data.blocker) errs.blocker = "Select your biggest blocker";
    if (!data.willingness) errs.willingness = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // Replace with your real endpoint (Formspree, Supabase, Airtable, etc.)
      await new Promise(res => setTimeout(res, 1200));
      console.log("Signup:", data);
      setSuccess(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const set = (k: keyof FormData, v: string) => {
    setData(d => ({ ...d, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  };

  if (!open) return null;

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: "100%", padding: "0.85rem 1rem",
    background: "transparent",
    border: `1px solid ${err ? "#ef4444" : "#2a2a2a"}`,
    color: "#fff", fontSize: "0.88rem",
    outline: "none",
    transition: "border-color 0.2s",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.15em",
    textTransform: "uppercase", color: "#555", display: "block", marginBottom: "0.5rem",
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.88)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(4px)",
      }}
    >
      <div style={{
        background: "#111",
        border: "1px solid #222",
        width: "100%", maxWidth: "500px",
        maxHeight: "90vh", overflowY: "auto",
        position: "relative",
      }}>
        {/* Header */}
        <div style={{ padding: "1.5rem 1.75rem", borderBottom: "1px solid #1e1e1e" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: "0.55rem", fontWeight: 700, color: "#e8a830", letterSpacing: "0.18em", marginBottom: "0.5rem" }}>WINTER ARC 2026</div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Reserve Your Spot</h2>
              <p style={{ fontSize: "0.78rem", color: "#555", marginTop: "0.35rem" }}>
                No payment now. We&apos;ll contact you when the founding cohort opens.
              </p>
            </div>
            <button
              onClick={onClose}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: "1.25rem", padding: "0.25rem", marginLeft: "1rem", flexShrink: 0 }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {success ? (
          <div style={{ padding: "3rem 1.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>◆</div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "1rem", color: "#e8a830" }}>You&apos;re on the list.</h3>
            <p style={{ fontSize: "0.88rem", color: "#666", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              We&apos;ll reach out when the founding cohort opens.
              Your next 90 days are coming.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: "100%" }}>CLOSE</button>
          </div>
        ) : (
          <div style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={data.email}
                  onChange={e => set("email", e.target.value)}
                  style={inputStyle(errors.email)}
                  onFocus={e => { e.currentTarget.style.borderColor = "#e8a830"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = errors.email ? "#ef4444" : "#2a2a2a"; }}
                />
                {errors.email && <p style={{ fontSize: "0.65rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors.email}</p>}
              </div>

              {/* 90-day goal */}
              <div>
                <label style={labelStyle}>Your 90-Day Goal *</label>
                <select
                  value={data.goal}
                  onChange={e => set("goal", e.target.value)}
                  style={{ ...inputStyle(errors.goal), appearance: "none" }}
                >
                  <option value="">Select your primary goal</option>
                  {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                {errors.goal && <p style={{ fontSize: "0.65rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors.goal}</p>}
              </div>

              {/* Biggest blocker */}
              <div>
                <label style={labelStyle}>Biggest Current Blocker *</label>
                <select
                  value={data.blocker}
                  onChange={e => set("blocker", e.target.value)}
                  style={{ ...inputStyle(errors.blocker), appearance: "none" }}
                >
                  <option value="">What holds you back most?</option>
                  {BLOCKERS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.blocker && <p style={{ fontSize: "0.65rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors.blocker}</p>}
              </div>

              {/* Willingness */}
              <div>
                <label style={labelStyle}>Would you pay $12 for your first 90-day Arc? *</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0" }}>
                  {["Yes", "Maybe", "No"].map(opt => (
                    <button
                      key={opt}
                      onClick={() => set("willingness", opt)}
                      style={{
                        padding: "0.75rem",
                        background: data.willingness === opt ? "rgba(232,168,48,0.15)" : "transparent",
                        border: `1px solid ${data.willingness === opt ? "#e8a830" : "#2a2a2a"}`,
                        borderRight: opt === "Yes" || opt === "Maybe" ? "none" : `1px solid ${data.willingness === opt ? "#e8a830" : "#2a2a2a"}`,
                        color: data.willingness === opt ? "#e8a830" : "#555",
                        fontSize: "0.75rem", fontWeight: 700,
                        cursor: "pointer", letterSpacing: "0.06em",
                        transition: "all 0.2s",
                      }}
                    >
                      {opt.toUpperCase()}
                    </button>
                  ))}
                </div>
                {errors.willingness && <p style={{ fontSize: "0.65rem", color: "#ef4444", marginTop: "0.3rem" }}>{errors.willingness}</p>}
              </div>

              {/* Optional name */}
              <div>
                <label style={labelStyle}>First Name (optional)</label>
                <input
                  type="text"
                  placeholder="Your first name"
                  value={data.name}
                  onChange={e => set("name", e.target.value)}
                  style={inputStyle()}
                  onFocus={e => { e.currentTarget.style.borderColor = "#e8a830"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#2a2a2a"; }}
                />
              </div>
            </div>

            <button
              onClick={submit}
              disabled={loading}
              className="btn-primary"
              style={{ width: "100%", marginTop: "1.5rem", minHeight: "54px", fontSize: "0.8rem" }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: "14px", height: "14px", border: "2px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                  APPLYING…
                </span>
              ) : "RESERVE MY FOUNDING SPOT →"}
            </button>

            <p style={{ fontSize: "0.62rem", color: "#444", textAlign: "center", marginTop: "1rem", lineHeight: 1.6 }}>
              No payment now. No spam. You&apos;ll be contacted when the first cohort opens.<br />
              $12 / 90 days at launch.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
