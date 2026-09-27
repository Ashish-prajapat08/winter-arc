"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          borderBottom: scrolled ? "1px solid #2f2f2f" : "1px solid transparent",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "0.85rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          WINTER ARC
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
          className="desktop-nav"
        >
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "For You", id: "who-its-for" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: "none",
                border: "none",
                color: "#888",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("signup")}
            className="btn-primary"
            style={{ padding: "0.6rem 1.5rem", minHeight: "40px", fontSize: "0.75rem" }}
          >
            Join the Cohort
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "1px solid #2f2f2f",
            color: "white",
            width: "40px",
            height: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <span style={{ width: "18px", height: "1.5px", background: menuOpen ? "#e8a830" : "white", display: "block", transition: "background 0.2s" }} />
          <span style={{ width: "18px", height: "1.5px", background: menuOpen ? "#e8a830" : "white", display: "block", transition: "background 0.2s" }} />
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "64px",
            left: 0,
            right: 0,
            zIndex: 99,
            backgroundColor: "#0a0a0a",
            borderBottom: "1px solid #2f2f2f",
            padding: "1.5rem clamp(1.5rem, 5vw, 4rem)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {[
            { label: "How It Works", id: "how-it-works" },
            { label: "For You", id: "who-its-for" },
            { label: "FAQ", id: "faq" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: "none",
                border: "none",
                color: "#ccc",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                textAlign: "left",
                padding: "0.5rem 0",
                borderBottom: "1px solid #1a1a1a",
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("signup")}
            className="btn-primary"
            style={{ marginTop: "0.5rem" }}
          >
            Join the Founding Cohort
          </button>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
