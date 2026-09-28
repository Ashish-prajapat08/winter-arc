"use client";
import { useState, useEffect } from "react";

export default function Navbar({ onCTAClick }: { onCTAClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          padding: "0 clamp(1.25rem, 4vw, 4rem)",
          height: "60px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          backgroundColor: scrolled ? "rgba(8,8,8,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid #1a1a1a" : "1px solid transparent",
          transition: "background-color 0.3s, border-color 0.3s",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none", border: "none", cursor: "pointer",
            fontSize: "0.8rem", fontWeight: 900,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: "#fff",
          }}
        >
          WINTER ARC
        </button>

        {/* Desktop links */}
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Your Arc", id: "arc-tracker" },
            { label: "Pricing", id: "founding-cohort" },
            { label: "FAQ", id: "faq" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.72rem", fontWeight: 600,
                letterSpacing: "0.06em", color: "#777",
                transition: "color 0.2s", padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onCTAClick}
            id="navbar-cta"
            className="btn-primary"
            style={{ padding: "0.6rem 1.5rem", minHeight: "38px", fontSize: "0.7rem" }}
          >
            START YOUR ARC
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            display: "none", flexDirection: "column",
            gap: "5px", padding: "4px",
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block", width: "22px", height: "1.5px",
                backgroundColor: "#fff",
                transition: "transform 0.25s, opacity 0.25s",
                transform:
                  mobileOpen && i === 0 ? "translateY(6.5px) rotate(45deg)"
                  : mobileOpen && i === 2 ? "translateY(-6.5px) rotate(-45deg)"
                  : mobileOpen && i === 1 ? "scaleX(0)"
                  : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed", top: "60px", left: 0, right: 0, zIndex: 99,
            background: "rgba(8,8,8,0.98)",
            borderBottom: "1px solid #1a1a1a",
            padding: "1.5rem 1.25rem",
            display: "flex", flexDirection: "column", gap: "1.25rem",
            backdropFilter: "blur(12px)",
          }}
        >
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "Your Arc", id: "arc-tracker" },
            { label: "Pricing", id: "founding-cohort" },
            { label: "FAQ", id: "faq" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.85rem", fontWeight: 600,
                letterSpacing: "0.08em", color: "#aaa",
                textAlign: "left", padding: 0,
              }}
            >
              {link.label}
            </button>
          ))}
          <button onClick={onCTAClick} className="btn-primary" style={{ width: "100%" }}>
            START YOUR ARC →
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
