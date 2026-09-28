"use client";
import { useState, useEffect, useCallback } from "react";
import { track } from "@vercel/analytics";

interface Props {
  open: boolean;
  onClose: () => void;
}

type FormData = {
  email: string;
  goal: string;
  blocker: string;
  willingness: string;
  name: string;
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

function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
  const result: Record<string, string> = {};
  utmKeys.forEach((k) => {
    const v = params.get(k);
    if (v) result[k] = v;
  });
  return result;
}

export default function SignupModal({ open, onClose }: Props) {
  const [data, setData] = useState<FormData>({
    email: "",
    goal: "",
    blocker: "",
    willingness: "",
    name: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Track modal open
      track("modal_opened");
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const validate = (): boolean => {
    const errs: Errors = {};
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = "Valid email required";
    }
    if (!data.goal) errs.goal = "Select your 90-day goal";
    if (!data.blocker) errs.blocker = "Select your biggest blocker";
    if (!data.willingness) errs.willingness = "Please select one";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const set = (k: keyof FormData, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setServerError(null);
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async () => {
    if (!validate()) {
      track("form_validation_failed");
      return;
    }

    setLoading(true);
    setServerError(null);

    // Track submission attempt
    track("form_submitted", { goal: data.goal, willingness: data.willingness });

    try {
      const utmParams = getUTMParams();
      const referrer = typeof document !== "undefined" ? document.referrer : "";

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email.trim().toLowerCase(),
          name: data.name.trim() || undefined,
          goal: data.goal,
          blocker: data.blocker,
          willingness_to_pay: data.willingness,
          referrer: referrer || undefined,
          ...utmParams,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setServerError("This email is already on the list. We'll be in touch.");
        } else {
          setServerError(result.error || "Something went wrong. Please try again.");
        }
        track("form_error", { status: String(res.status) });
        return;
      }

      // Success
      track("signup_success", { goal: data.goal, willingness: data.willingness });
      setSuccess(true);
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      track("form_network_error");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const inputStyle = (err?: string): React.CSSProperties => ({
    width: "100%",
    padding: "0.85rem 1rem",
    background: "transparent",
    border: `1px solid ${err ? "#ef4444" : "#2a2a2a"}`,
    color: "#fff",
    fontSize: "0.88rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: "0.55rem",
    fontWeight: 700,
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "#555",
    display: "block",
    marginBottom: "0.5rem",
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.88)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        style={{
          background: "#111",
          border: "1px solid #222",
          width: "100%",
          maxWidth: "500px",
          maxHeight: "92vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem 1.75rem",
            borderBottom: "1px solid #1e1e1e",
            position: "sticky",
            top: 0,
            background: "#111",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div
                style={{
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  color: "#e8a830",
                  letterSpacing: "0.18em",
                  marginBottom: "0.5rem",
                }}
              >
                WINTER ARC — FOUNDING COHORT
              </div>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
                Reserve Your Spot
              </h2>
              <p style={{ fontSize: "0.78rem", color: "#555", marginTop: "0.35rem", lineHeight: 1.5 }}>
                No payment now. We&apos;ll contact you when the cohort opens.
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#555",
                fontSize: "1.25rem",
                padding: "0.25rem",
                marginLeft: "1rem",
                flexShrink: 0,
                lineHeight: 1,
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Success state */}
        {success ? (
          <div style={{ padding: "3rem 1.75rem", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1.25rem", color: "#e8a830" }}>◆</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "0.75rem", color: "#e8a830" }}>
              You&apos;re on the list.
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.7, marginBottom: "0.5rem" }}>
              Check your inbox — we sent a confirmation to{" "}
              <strong style={{ color: "#ccc" }}>{data.email}</strong>.
            </p>
            <p style={{ fontSize: "0.88rem", color: "#555", lineHeight: 1.7, marginBottom: "2rem" }}>
              We&apos;ll reach out directly when the founding cohort opens. No payment collected until then.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ width: "100%", minHeight: "48px" }}>
              CLOSE
            </button>
          </div>
        ) : (
          <div style={{ padding: "1.75rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  id="signup-email"
                  placeholder="your@email.com"
                  value={data.email}
                  onChange={(e) => set("email", e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  style={inputStyle(errors.email)}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#e8a830";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.email ? "#ef4444" : "#2a2a2a";
                  }}
                  autoComplete="email"
                />
                {errors.email && (
                  <p style={{ fontSize: "0.65rem", color: "#ef4444", marginTop: "0.3rem" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* 90-day goal */}
              <div>
                <label style={labelStyle}>Your 90-Day Goal *</label>
                <select
                  id="signup-goal"
                  value={data.goal}
                  onChange={(e) => set("goal", e.target.value)}
                  style={{ ...inputStyle(errors.goal), appearance: "none" as const }}
                >
                  <option value="">Select your primary goal</option>
                  {GOALS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
                {errors.goal && (
                  <p style={{ fontSize: "0.65rem", color: "#ef4444", marginTop: "0.3rem" }}>
                    {errors.goal}
                  </p>
                )}
              </div>

              {/* Biggest blocker */}
              <div>
                <label style={labelStyle}>Biggest Current Blocker *</label>
                <select
                  id="signup-blocker"
                  value={data.blocker}
                  onChange={(e) => set("blocker", e.target.value)}
                  style={{ ...inputStyle(errors.blocker), appearance: "none" as const }}
                >
                  <option value="">What holds you back most?</option>
                  {BLOCKERS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                {errors.blocker && (
                  <p style={{ fontSize: "0.65rem", color: "#ef4444", marginTop: "0.3rem" }}>
                    {errors.blocker}
                  </p>
                )}
              </div>

              {/* Willingness to pay */}
              <div>
                <label style={labelStyle}>Would you pay $12 for your first 90-day Arc? *</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0" }}>
                  {["Yes", "Maybe", "No"].map((opt, i) => (
                    <button
                      key={opt}
                      id={`signup-pay-${opt.toLowerCase()}`}
                      onClick={() => set("willingness", opt)}
                      style={{
                        padding: "0.75rem",
                        background: data.willingness === opt ? "rgba(232,168,48,0.15)" : "transparent",
                        border: `1px solid ${data.willingness === opt ? "#e8a830" : errors.willingness ? "#ef4444" : "#2a2a2a"}`,
                        borderRight:
                          i < 2
                            ? "none"
                            : `1px solid ${data.willingness === opt ? "#e8a830" : errors.willingness ? "#ef4444" : "#2a2a2a"}`,
                        color: data.willingness === opt ? "#e8a830" : "#555",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        letterSpacing: "0.06em",
                        transition: "all 0.2s",
                      }}
                    >
                      {opt.toUpperCase()}
                    </button>
                  ))}
                </div>
                {errors.willingness && (
                  <p style={{ fontSize: "0.65rem", color: "#ef4444", marginTop: "0.3rem" }}>
                    {errors.willingness}
                  </p>
                )}
              </div>

              {/* Optional name */}
              <div>
                <label style={labelStyle}>First Name (optional)</label>
                <input
                  type="text"
                  id="signup-name"
                  placeholder="Your first name"
                  value={data.name}
                  onChange={(e) => set("name", e.target.value)}
                  style={inputStyle()}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#e8a830";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#2a2a2a";
                  }}
                  autoComplete="given-name"
                />
              </div>
            </div>

            {/* Server error */}
            {serverError && (
              <div
                style={{
                  marginTop: "1rem",
                  padding: "0.75rem 1rem",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.25)",
                  fontSize: "0.78rem",
                  color: "#ef4444",
                  lineHeight: 1.5,
                }}
              >
                {serverError}
              </div>
            )}

            <button
              id="signup-submit"
              onClick={submit}
              disabled={loading}
              className="btn-primary"
              style={{
                width: "100%",
                marginTop: "1.5rem",
                minHeight: "54px",
                fontSize: "0.8rem",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      border: "2px solid #000",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                      display: "inline-block",
                    }}
                  />
                  SAVING YOUR SPOT…
                </span>
              ) : (
                "RESERVE MY FOUNDING SPOT →"
              )}
            </button>

            <p
              style={{
                fontSize: "0.62rem",
                color: "#444",
                textAlign: "center",
                marginTop: "1rem",
                lineHeight: 1.7,
              }}
            >
              No payment collected now. No spam. You&apos;ll be contacted when the first cohort opens.
              <br />
              Founding price: $12 / 90 days — limited to 50 members.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
